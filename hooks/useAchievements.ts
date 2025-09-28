import { useUser } from "@/contexts/UserContext";
import { supabase } from "@/utils/supabaseClient";
import { useState, useEffect, useCallback } from "react";

type Achievement = {
  name: string;
  description: string;
  emoji: string;
  rarity: string;
};

export const useAchievements = () => {
  const { userData, loading: userLoading } = useUser() ?? {};
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAchievements = useCallback(async () => {
    if (!userData?.id) return;
    setLoading(true);
    new Promise(resolve => setTimeout(resolve, 3000)); // Simulate network delay
    const { data, error } = await supabase
      .from("USER_ACHIEVEMENTS")
      .select("ACHIEVEMENTS(name, description, emoji, rarity)")
      .eq("userId", userData.id);

    if (!error) {
      setAchievements(data?.map(item => item.ACHIEVEMENTS) ?? []);
    }
    setLoading(false);
  }, [userData?.id]);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    await fetchAchievements();
    setRefreshing(false);
  }, [fetchAchievements]);

  useEffect(() => {
    if (!userLoading && userData?.id) {
      fetchAchievements();
    }
  }, [userLoading, userData?.id, fetchAchievements]);

  return { achievements, fetchAchievements, loading, refreshing, refresh };
};
