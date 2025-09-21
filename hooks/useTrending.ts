import { useState, useCallback, useEffect } from "react";

interface GoogleBook { id: string; title: string; authors: string[]; description?: string; categories?: string[]; pageCount?: number; thumbnail?: string; language?: string; publisher?: string; publishedDate?: string; }

export const useTrendingBooks = () => {
  const [books, setBooks] = useState<GoogleBook[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=bestseller&orderBy=relevance&maxResults=10`
      );
      const data = await response.json();

      if (!data.items) {
        setBooks([]);
        return;
      }

      const formattedBooks: GoogleBook[] = data.items.map((item: any) => ({
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors || [],
        description: item.volumeInfo.description,
        categories: item.volumeInfo.categories,
        pageCount: item.volumeInfo.pageCount,
        thumbnail: item.volumeInfo.imageLinks?.thumbnail?.replace("http:", "https:"),
        language: item.volumeInfo.language,
        publisher: item.volumeInfo.publisher,
        publishedDate: item.volumeInfo.publishedDate,
      }));

      setBooks(formattedBooks);
    } catch (err: any) {
      setError(err.message || "Failed to fetch trending books");
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Call fetchBooks automatically on mount
  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // Expose refresh for manual refresh
  const refresh = async () => {
    await fetchBooks();
  };

  return { books, loading, error, refresh };
};
