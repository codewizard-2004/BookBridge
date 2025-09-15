import { useEffect, useState } from "react";
import { useUser } from "@/contexts/UserContext";

const getRandomGenres = (genres: string[], count = 3) => {
  const shuffled = [...genres].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const fetchBooksByGenre = async (genre: string) => {
  const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
  const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(
    genre
  )}&maxResults=1&key=${API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.items || [];
  } catch (err) {
    console.error(`Error fetching books for genre ${genre}:`, err);
    return [];
  }
};

export const useRecommendations = () => {
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

  console.log("In hook", recommendedBooks)

  return { recommendedBooks, fetching };
};
