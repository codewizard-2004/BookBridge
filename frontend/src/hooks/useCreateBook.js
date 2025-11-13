import { useState } from "react";
import { collection, addDoc, serverTimestamp , doc, updateDoc , arrayUnion} from "firebase/firestore";
import { firestore } from '../firebase/firebase'; // Adjust the path to your Firebase config
import useAuthStore from "../store/authStore"; 
import toast from "react-hot-toast";

const useCreateBook = () => {
    const userUID = useAuthStore((state) => state.user); // Getting the user UID from auth store
    const [loading, setLoading] = useState(false);

    const createBook = async (title, author, description) => {
        setLoading(true);
        try {
            if (!userUID) {
                throw new Error('User not authenticated');
            }

            const bookData = {
                title,
                author,
                donorId: userUID,
                description,
                createdAt: serverTimestamp() // Automatically sets the timestamp
            };

            const docRef = await addDoc(collection(firestore, 'Books'), bookData);
            // Update the User document to include the new book ID in the books array
            const userDocRef = doc(firestore, 'Users', userUID);
            await updateDoc(userDocRef, {
                books: arrayUnion(docRef.id) // Append the new book ID to the books array
            });

            toast.success("Thank You for your valuable donation❤️ Our volunteers will soon contact you");
        } catch (error) {
            toast.error(`Error adding book: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return { loading, createBook };
};

export default useCreateBook;
