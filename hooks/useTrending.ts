import { useState, useEffect, useCallback } from "react";

type Book = {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  number_of_pages?: number;
  subjects?: string[];
};

export function useTrendingBooks(limit: number = 10) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrending = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `https://openlibrary.org/search.json?q=the&sort=editions&limit=${limit}`
      );
      if (!res.ok) throw new Error("Failed to fetch trending books");

      const data = await res.json();
      const docs = data.docs || [];

      const enrichedBooks: Book[] = await Promise.all(
        docs.map(async (doc: any) => {
          try {
            const editionKey = doc.cover_edition_key || doc.edition_key?.[0];
            let editionData: any = {};
            let workData: any = {};

            if (editionKey) {
              const editionRes = await fetch(
                `https://openlibrary.org/books/${editionKey}.json`
              );
              if (editionRes.ok) {
                editionData = await editionRes.json();
              }
            }

            if (doc.key) {
              const workRes = await fetch(
                `https://openlibrary.org${doc.key}.json`
              );
              if (workRes.ok) {
                workData = await workRes.json();
              }
            }

            // ✅ Always return a valid shape
            return {
              key: doc.key,
              title: doc.title,
              author_name: doc.author_name || [],
              cover_i: doc.cover_i,
              number_of_pages:
                editionData.number_of_pages || doc.number_of_pages || 0,
              subjects:
                editionData.subjects ||
                workData.subjects ||
                doc.subject ||
                [],
            };
          } catch (err) {
            console.warn("Failed to enrich doc:", doc.key, err);
            return {
              key: doc.key,
              title: doc.title,
              author_name: doc.author_name || [],
              cover_i: doc.cover_i,
              number_of_pages: 0,
              subjects: [],
            };
          }
        })
      );

      setBooks(enrichedBooks);
      console.log("Fetched docs:", docs.length);
      console.log("Enriched:", enrichedBooks.length);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchTrending();
  }, [fetchTrending]);

  return { books, loading, error, refetch: fetchTrending };
}
