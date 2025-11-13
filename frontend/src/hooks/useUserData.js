import { useState, useEffect } from "react";
import { supabase } from '../lib/supabase';
import useAuthStore from "../store/authStore";

const useUserData = () => {
  const userUID = useAuthStore((state) => state.user);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userUID) {
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('users')
          .select('*')
          .eq('id', userUID)
          .single();

        if (fetchError) throw fetchError;

        const { data: booksData, error: booksError } = await supabase
          .from('books')
          .select('id')
          .eq('donor_id', userUID);

        if (booksError) throw booksError;

        setUserData({
          ...data,
          books: booksData || []
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();

    const channel = supabase
      .channel('user-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'users',
        filter: `id=eq.${userUID}`
      }, () => {
        fetchUserData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userUID]);

  return { userData, loading, error };
};

export default useUserData;
