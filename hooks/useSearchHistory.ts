import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/utils/supabaseClient";
import { useUser } from "@/contexts/UserContext";

export function useSearchHistory() {
  const { userData } = useUser() || {};
  const [history, setHistory] = useState<string[]>([]);

  const fetchHistory = useCallback(async () => {
    if (!userData?.id) return;

    const { data, error } = await supabase
      .from("HISTORY")
      .select("search_item")
      .eq("userId", userData.id)
      .order("userId", { ascending: false })
      .limit(10);

    console.log("From hook", data, error)

    if (!error && data) {
      setHistory(data.map((row) => row.search_item));
    }
  }, [userData?.id]);

  const clearHistory = useCallback(async () => {
    if (!userData?.id) return;

    const { error } = await supabase
      .from("HISTORY")
      .delete()
      .eq("userId", userData.id);

    if (error) {
      console.error("Error clearing history:", error);
    } else {
      setHistory([]);
    }
  }, [userData?.id]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return { history, fetchHistory, clearHistory };
}
