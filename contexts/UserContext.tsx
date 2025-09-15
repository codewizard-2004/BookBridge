import { supabase } from "@/utils/supabaseClient";
import React, { createContext, useContext, useEffect, useState } from "react";

interface IUserContext {
  userData: any;
  setUserData: React.Dispatch<React.SetStateAction<any>>;
  loading: boolean;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // 1. Fetch user profile
        const { data: profile, error: profileError } = await supabase
          .from("USERS")
          .select("*")
          .eq("id", user.id)
          .single();

        if (profileError) {
          console.error(profileError);
          setLoading(false);
          return;
        }

        // 2. Fetch genres (join approach)
        const { data: userGenres, error: genreError } = await supabase
          .from("USER_GENRE")
          .select(`
            genreId,
            GENRES(name)
          `)
          .eq("userId", user.id);
        let genres: string[] = [];
        if (!genreError && userGenres) {
          genres = userGenres.map((g) => g.GENRES?.name);
        }

        setUserData({
          ...profile,
          favoriteGenres: genres,
        });
        console.log(userData)
      }
      setLoading(false);
    };
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// custom hook
export const useUser = () => useContext(UserContext);
