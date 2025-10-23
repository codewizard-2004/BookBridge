import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { useUser } from '@/contexts/UserContext';

export const useReadingStreak = () => {
  const { userData } = useUser() ?? {};
  const [streak, setStreak] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userData?.id) {
      setLoading(false);
      return;
    }

    const calculateStreak = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('READING_LOG')
          .select('created_at')
          .eq('userId', userData.id);

        if (error) throw error;

        if (!data || data.length === 0) {
          setStreak(0);
          return;
        }

        // Convert to YYYY-MM-DD strings and sort descending
        const dates = data
          .map((entry: { created_at: string }) => entry.created_at.split('T')[0])
          .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

        const dateSet = new Set(dates);

        let streakCount = 0;
        let currentDate = new Date();

        // Count consecutive days backwards from today
        while (true) {
          const dateStr = currentDate.toISOString().split('T')[0];
          if (dateSet.has(dateStr)) {
            streakCount += 1;
            currentDate.setDate(currentDate.getDate() - 1);
          } else {
            break;
          }
        }

        setStreak(streakCount);
      } catch (err: any) {
        console.error('Error calculating reading streak:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    calculateStreak();
  }, [userData?.id]);

  return { streak, loading, error };
};
