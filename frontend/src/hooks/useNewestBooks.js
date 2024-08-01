import { useState, useEffect } from "react";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { firestore } from '../firebase/firebase'; // Adjust the path to your Firebase config
import toast from "react-hot-toast";
import { format } from 'date-fns';

const useNewestBooks = () => {
    const [newestBooks, setNewestBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Define the query to get the newest 5 books based on createdAt timestamp
        const q = query(
            collection(firestore, "Books"),
            orderBy("createdAt", "desc"),
            limit(5)
        );

        // Listen for real-time updates
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const books = snapshot.docs.map((doc) => ({
                id: doc.id,
                title: doc.data().title, // Only fetch the title
                createdAt: format(doc.data().createdAt.toDate(), 'dd-MM-yyyy')
            }));
            setNewestBooks(books);
            setLoading(false);
        }, (error) => {
            toast.error(`Failed to fetch newest books: ${error.message}`);
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    return { loading, newestBooks };
};

export default useNewestBooks;
