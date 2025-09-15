import { useEffect, useState } from "react";
import { useUser } from "@/contexts/UserContext";

type UseBooksOptions =
  | { type: "recommendations" }
  | { type: "search"; query: string }
  | { type: "isbn"; query: string };

const getRandomGenres = (genres: string[], count = 3) => {
  const shuffled = [...genres].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

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

export const useBooks = (options: UseBooksOptions) => {
  const { userData, loading } = useUser() ?? {};
  const [books, setBooks] = useState<any[]>([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const loadBooks = async () => {
      setFetching(true);
      let results: any[] = [];

      if (options.type === "recommendations") {
        if (!loading && userData?.favoriteGenres?.length > 0) {
          const randomGenres = getRandomGenres(userData.favoriteGenres, 3);
          const promises = randomGenres.map((g) =>{
            fetchBooks(`subject:${g}`)
          }
          );
          const genreResults = await Promise.all(promises);
          results = genreResults.flat().sort(() => 0.5 - Math.random());
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
