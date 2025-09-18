import { useState, useEffect } from "react";

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

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1. Fetch popular books as "trending"
        const res = await fetch(
          `https://openlibrary.org/search.json?q=the&sort=editions&limit=${limit}`
        );
        if (!res.ok) throw new Error("Failed to fetch trending books");

        const data = await res.json();
        const docs = data.docs || [];

        // 2. Enrich with both edition + work details
        const enrichedBooks: Book[] = await Promise.all(
          docs.map(async (doc: any) => {
            try {
              const editionKey = doc.cover_edition_key || doc.edition_key?.[0];
              let editionData: any = {};
              let workData: any = {};

              // fetch edition details (for pages)
              if (editionKey) {
                const editionRes = await fetch(
                  `https://openlibrary.org/books/${editionKey}.json`
                );
                if (editionRes.ok) {
                  editionData = await editionRes.json();
                }
              }

              // fetch work details (for subjects/genres)
              if (doc.key) {
                const workRes = await fetch(
                  `https://openlibrary.org${doc.key}.json`
                );
                if (workRes.ok) {
                  workData = await workRes.json();
                }
              }

              return {
                key: doc.key,
                title: doc.title,
                author_name: doc.author_name || [],
                cover_i: doc.cover_i,
                number_of_pages: editionData.number_of_pages,
                subjects:
                  editionData.subjects ||
                  workData.subjects ||
                  [], // fallback
              };
            } catch {
              return doc;
            }
          })
        );

        setBooks(enrichedBooks);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, [limit]);
  return { books, loading, error };
}
