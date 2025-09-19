import { useEffect, useState } from "react";
import { useUser } from "@/contexts/UserContext";

const getRandomGenres = (genres: string[], count = 6) => {
  const shuffled = [...genres].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const fetchBooksByGenre = async (genre: string) => {
  const url = `https://openlibrary.org/search.json?subject=${encodeURIComponent(
    genre
  )}&limit=5`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    return (data.docs || []).map((book: any) => ({
      id: book.key,
      title: book.title,
      author: book.author_name?.join(", ") || "Unknown Author",
      cover: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : null,
      totalPages: book.number_of_pages_median || 0,
      year: book.first_publish_year || "Unknown",
      genre, // 👈 we explicitly add the genre used in the query
    }));
  } catch (err) {
    console.error(`Error fetching books for genre ${genre}:`, err);
    return [];
  }
};


export const useRecommendation = () => {
  const { userData, loading } = useUser() ?? {};
  const [recommendedBooks, setRecommendedBooks] = useState<any[]>([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const loadRecommendations = async () => {
      if (!loading && userData?.favoriteGenres?.length > 0) {
        setFetching(true);

        const randomGenres = getRandomGenres(userData.favoriteGenres, 3);
        const promises = randomGenres.map((g) => fetchBooksByGenre(g));
        const results = await Promise.all(promises);

        const merged = results.flat().sort(() => 0.5 - Math.random());

        setRecommendedBooks(merged);
        setFetching(false);
      }
    };

    loadRecommendations();
  }, [loading, userData]);

  return { recommendedBooks, fetching };
};
