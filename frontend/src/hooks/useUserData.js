import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { firestore } from '../firebase/firebase'; // Adjust the path to your Firebase config
import useAuthStore from "../store/authStore"; // Adjust the path to your zustand store

const useUserData = () => {
  const userUID = useAuthStore((state) => state.user);
  console.log(userUID)
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userUID) {
      setLoading(false);
      return;
    }

    const userDocRef = doc(firestore, "Users", userUID);

    const unsubscribe = onSnapshot(
      userDocRef,
      (doc) => {
        if (doc.exists()) {
          setUserData(doc.data());
          setLoading(false);
        } else {
          setError("No such user found.");
          setLoading(false);
        }
      },
      (err) => {
        setError("Failed to fetch user data.");
        console.error(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userUID]);
  console.log(userData)

  return { userData, loading, error };
};

export default useUserData;
