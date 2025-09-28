import { useUser } from "@/contexts/UserContext";
import { supabase } from "@/utils/supabaseClient";
import { useState, useEffect, useCallback } from "react";

type Achievement = {
  name: string;
  description: string;
  emoji: string;
  rarity: string;
};

export const useAchievements = (userIdParam?: string) => {
  const { userData, loading: userLoading } = useUser() ?? {};
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAchievements = useCallback(async (overrideId?: string) => {
    const userIdToUse = overrideId || userIdParam || userData?.id;
    if (!userIdToUse) return;

    setLoading(true);

    // optional simulated network delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    const { data, error } = await supabase
      .from("USER_ACHIEVEMENTS")
      .select("ACHIEVEMENTS(name, description, emoji, rarity)")
      .eq("userId", userIdToUse);

    if (!error) {
      setAchievements(data?.map(item => item.ACHIEVEMENTS) ?? []);
    } else {
      console.error("Error fetching achievements:", error);
    }

    setLoading(false);
  }, [userData?.id, userIdParam]);

  const refresh = useCallback(async (overrideId?: string) => {
    setRefreshing(true);
    await fetchAchievements(overrideId);
    setRefreshing(false);
  }, [fetchAchievements]);

  useEffect(() => {
    if (!userLoading) {
      fetchAchievements();
    }
  }, [userLoading, fetchAchievements]);

  return { achievements, fetchAchievements, loading, refreshing, refresh };
};
