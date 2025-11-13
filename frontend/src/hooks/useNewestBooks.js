import { useState, useEffect } from "react";
import { supabase } from '../lib/supabase';
import toast from "react-hot-toast";
import { format } from 'date-fns';

const useNewestBooks = () => {
    const [newestBooks, setNewestBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNewestBooks = async () => {
            try {
                const { data, error } = await supabase
                    .from('books')
                    .select('id, title, created_at')
                    .order('created_at', { ascending: false })
                    .limit(5);

                if (error) throw error;

                const books = data.map((book) => ({
                    id: book.id,
                    title: book.title,
                    createdAt: format(new Date(book.created_at), 'dd-MM-yyyy')
                }));

                setNewestBooks(books);
            } catch (error) {
                toast.error(`Failed to fetch newest books: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchNewestBooks();

        const channel = supabase
            .channel('books-changes')
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'books'
            }, () => {
                fetchNewestBooks();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return { loading, newestBooks };
};

export default useNewestBooks;
