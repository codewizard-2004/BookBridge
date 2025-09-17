import { useState, useCallback, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";
import { useUser } from "@/contexts/UserContext";

type Book = {
  googleId: string;
  title: string;
  description: string;
  author: string;
  genre: string;
  rating: number;
  total_pages: number;
  cover: string;
  year: string;
  language: string;
  publisher: string;
};

export function useSaveBook(book: Book) {
  const { userData, loading: userLoading } = useUser() || {};
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  // 🔍 check if the book is already saved on mount
  useEffect(() => {
    const checkSaved = async () => {
      if (userLoading || !userData?.id || !book?.googleId) return;

      // Find the internal BOOKS.id from googleId
      const { data: bookRow, error: bookError } = await supabase
        .from("BOOKS")
        .select("id")
        .eq("id", book.googleId)
        .maybeSingle();

      if (bookError || !bookRow) {
        setIsSaved(false);
        return;
      }

      // Check SAVED
      const { data: savedRow } = await supabase
        .from("SAVED")
        .select("id")
        .eq("userId", userData.id)
        .eq("bookId", bookRow.id)
        .maybeSingle();

      setIsSaved(!!savedRow);
    };

    checkSaved();
  }, [userData?.id, userLoading, book?.googleId]);

  const saveBook = useCallback(
    async () => {
      if (userLoading) return;
      if (!userData?.id) {
        setError("User not logged in");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // 1. Check if book exists by googleId
        const { data: existingBook } = await supabase
          .from("BOOKS")
          .select("id")
          .eq("id", book.googleId)
          .maybeSingle();

        let bookId: number;

        // 2. Insert book if not exists
        if (!existingBook) {
          const { data: inserted, error: insertError } = await supabase
            .from("BOOKS")
            .insert([
              {
                id: book.googleId,
                title: book.title,
                description: book.description,
                author: book.author,
                publisher: book.publisher,
                year: book.year,
                language: book.language,
                genre: book.genre,
                rating: book.rating,
                total_pages: book.total_pages,
                cover: book.cover,
              },
            ])
            .select("id")
            .single();

          if (insertError) throw insertError;
          bookId = inserted.id;
        } else {
          bookId = existingBook.id;
        }

        // 3. Insert into SAVED
        const { error: savedError } = await supabase
          .from("SAVED")
          .upsert([{ userId: userData.id, bookId }], {
            onConflict: "userId,bookId",
          });

        if (savedError) throw savedError;

        setIsSaved(true); // ✅ update local state
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
    [userData, userLoading, book]
  );

  const unsaveBook = useCallback(
    async () => {
      if (!userData?.id) return;

      setLoading(true);
      try {
        const { data: bookRow } = await supabase
          .from("BOOKS")
          .select("id")
          .eq("id", book.googleId)
          .maybeSingle();

        if (bookRow) {
          console.log("check 1" , userData.id , bookRow.id)
          const { data , error } = await supabase
            .from("SAVED")
            .delete()
            .eq("userId", userData.id)
            .eq("bookId", bookRow.id)
            .select();
          console.log(data , error)

          setIsSaved(false);
        }
      } finally {
        setLoading(false);
      }
    },
    [userData, book]
  );

  return { saveBook, unsaveBook, isSaved, loading, error };
}
