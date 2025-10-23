import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/utils/supabaseClient";
import { useUser } from "@/contexts/UserContext";

type Book = {
  id: string;
  title: string;
  author: string;
  description?: string;
  genre?: string;
  rating?: number;
  total_pages?: number;
  cover?: string;
  pages_read?: number;
};

export const useUserReadingBooks = () => {
  const { userData } = useUser() ?? {};
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserReadingBooks = useCallback(async () => {
    if (!userData) return;

    try {
      const { data, error } = await supabase
        .from("READINGS")
        .select(
          `
          pages_read,
          BOOKS (
            id,
            title,
            author,
            description,
            genre,
            rating,
            total_pages,
            cover
          )
        `
        )
        .eq("userId", userData.id);

      if (error) throw error;

      const formatted = data?.map((r: any) => ({
        ...r.BOOKS,
        pages_read: r.pages_read,
      }));

      setBooks(formatted || []);
    } catch (err: any) {
      console.error("Error fetching books:", err);
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [userData]);

  useEffect(() => {
    setLoading(true);
    fetchUserReadingBooks();
  }, [fetchUserReadingBooks]);

  // For drag-down refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchUserReadingBooks();
  }, [fetchUserReadingBooks]);

  return { books, loading, refreshing, error, onRefresh, refetch: fetchUserReadingBooks };
};
