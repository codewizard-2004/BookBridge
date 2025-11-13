import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const useTopUsers = () => {
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const { data: booksData, error: booksError } = await supabase
          .from('books')
          .select('donor_id');

        if (booksError) throw booksError;

        const donorCounts = {};
        booksData.forEach(book => {
          donorCounts[book.donor_id] = (donorCounts[book.donor_id] || 0) + 1;
        });

        const topDonorIds = Object.entries(donorCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([id]) => id);

        if (topDonorIds.length === 0) {
          setTopUsers([]);
          return;
        }

        const { data: usersData, error: usersError } = await supabase
          .from('users')
          .select('id, fullname')
          .in('id', topDonorIds);

        if (usersError) throw usersError;

        const users = usersData.map(user => ({
          fullname: user.fullname,
          booksCount: donorCounts[user.id] || 0
        })).sort((a, b) => b.booksCount - a.booksCount);

        setTopUsers(users);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopUsers();
  }, []);

  return { topUsers, loading, error };
};

export default useTopUsers;
