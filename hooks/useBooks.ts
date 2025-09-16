import { useEffect, useState } from "react";
import { useUser } from "@/contexts/UserContext";

type UseBooksOptions =
  | { type: "bookId"; query: string }
  | { type: "search"; query: string }
  | { type: "isbn"; query: string };

const fetchBooks = async (query: string) => {
  const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
    query
  )}&maxResults=10&key=${API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    //console.log("In useBooks",data)
    return data.items || [];
  } catch (err) {
    console.error(`Error fetching books for query "${query}":`, err);
    return [];
  }
};

const fetchBookById = async (id: string) => {
  const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
  const url = `https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data ? [data] : [];
  } catch (err) {
    console.error(`Error fetching book by id "${id}":`, err);
    return [];
  }
};

export const useBooks = (options: UseBooksOptions) => {
  const { userData, loading } = useUser() ?? {};
  const [books, setBooks] = useState<any[]>([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const loadBooks = async () => {
      setFetching(true);
      let results: any[] = [];
      if (options.query.length == 0) {
        return;
      }

      if (options.type === "bookId") {
        if (!loading && userData?.favoriteGenres?.length > 0) {
          results = await fetchBookById(options.query)
        }
      } else if (options.type === "search") {
        results = await fetchBooks(options.query);
      } else if (options.type === "isbn") {
        results = await fetchBooks(`isbn:${options.query}`);
      }

      setBooks(results);
      setFetching(false);
    };

    loadBooks();
  }, [JSON.stringify(options), userData, loading]);

  return { books, fetching };
};
