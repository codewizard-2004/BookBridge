// UserContext.tsx
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
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from("USERS")
          .select("*")
          .eq("id", user.id)
          .single();

        if (!error) setUserData(data);
        console.log("Issue in UserContext",userData);
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
