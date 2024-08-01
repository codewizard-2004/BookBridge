import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase/firebase'; // Import your Firebase setup

const useTopUsers = () => {
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const usersCollection = collection(firestore, 'Users');
        const querySnapshot = await getDocs(usersCollection);

        // Map through the documents to calculate the books count and sort them
        const users = querySnapshot.docs
          .map((doc) => {
            const data = doc.data();
            const booksCount = data.books ? data.books.length : 0; // Calculate books count
            return {
              fullname: data.fullname,
              booksCount,
            };
          })
          .sort((a, b) => b.booksCount - a.booksCount) // Sort by books count (descending)
          .slice(0, 5); // Get the top 5 users

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
