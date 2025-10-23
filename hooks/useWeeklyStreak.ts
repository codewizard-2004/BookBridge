import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { useUser } from '@/contexts/UserContext';

interface WeekDay {
  day: string;
  icon: string;
}

export const useWeeklyStreak = () => {
  const { userData } = useUser() ?? {};
  const [weekData, setWeekData] = useState<WeekDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userData?.id) {
      setLoading(false);
      return;
    }

    const fetchWeeklyStreak = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('READING_LOG')
          .select('created_at')
          .eq('userId', userData.id);

        if (error) throw error;

        // Convert timestamps to 'YYYY-MM-DD' strings
        const readDates = new Set(
          data?.map((entry: { created_at: string }) => entry.created_at.split('T')[0])
        );

        const today = new Date();
        const dayOfWeek = today.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
        const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Adjust so Monday is start

        const week: WeekDay[] = [];

        for (let i = 0; i < 7; i++) {
          const date = new Date(today);
          date.setDate(today.getDate() + mondayOffset + i);
          const dateStr = date.toISOString().split('T')[0];

          let icon = '';
          if (readDates.has(dateStr)) {
            icon = '🔥'; // read
          } else if (date > today) {
            icon = '⭕'; // future day
          } else {
            icon = '❄️'; // missed
          }

          const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
          week.push({ day: dayNames[date.getDay()], icon });
        }

        setWeekData(week);
      } catch (err: any) {
        console.error('Error fetching weekly streak:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyStreak();
  }, [userData?.id]);

  return { weekData, loading, error };
};
