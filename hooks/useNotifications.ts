import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/utils/supabaseClient";
import { useUser } from "@/contexts/UserContext";

export const useNotifications = () => {
  const { userData } = useUser() ?? {};
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch notifications function
  const fetchNotifications = useCallback(async () => {
    if (!userData) return;
    new Promise(resolve => setTimeout(resolve, 6000))
    setLoading(true);
    const { data, error } = await supabase
      .from("NOTIFICATIONS")
      .select("*")
      .eq("userId", userData.id)
      .order("created_at", { ascending: false });

    if (!error) setNotifications(data || []);
    setLoading(false);
  }, [userData]);

  useEffect(() => {
    if (!userData) return;

    // Initial fetch
    fetchNotifications();

    // Subscribe to real-time changes
    const channel = supabase
      .channel("notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "NOTIFICATIONS",
          filter: `userId=eq.${userData.id}`,
        },
        (payload) => {
          // Add new notification to the top
          setNotifications((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [userData, fetchNotifications]);

  return { notifications, loading, refresh: fetchNotifications };
};
