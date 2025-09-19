import { useEffect, useState } from "react";

export const useLatest = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>("");

  // Use sort=new to get latest books
  const url = `https://openlibrary.org/search.json?q=a&sort=new&limit=10`;

  useEffect(() => {
    const loadLatest = async () => {
      try {
        setLoading(true);
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Open Library API error: ${res.status}`);
        }
        const result = await res.json();

        const mapped = (result.docs || [])
          .map((book: any) => ({
            id: book.key,
            title: book.title,
            author: book.author_name?.join(", ") || "Unknown Author",
            cover: book.cover_i
              ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
              : null,
            year: book.first_publish_year ?? "Unknown",
            totalPages: book.number_of_pages_median ?? 0,
          }));

        setData(mapped);
      } catch (err) {
        console.error("ERROR in useLatest:\n", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadLatest();
  }, []);

  return { data, loading, error };
};
