import { useState } from "react";
import { supabase } from '../lib/supabase';
import useAuthStore from "../store/authStore";
import toast from "react-hot-toast";

const useCreateBook = () => {
    const userUID = useAuthStore((state) => state.user);
    const [loading, setLoading] = useState(false);

    const createBook = async (title, author, description, coverImageUrl = null, isbn = null) => {
        setLoading(true);
        try {
            if (!userUID) {
                throw new Error('User not authenticated');
            }

            const { data: bookData, error } = await supabase
                .from('books')
                .insert([
                    {
                        title,
                        author,
                        description,
                        cover_image_url: coverImageUrl,
                        isbn,
                        donor_id: userUID,
                        status: 'pending'
                    }
                ])
                .select()
                .single();

            if (error) throw error;

            toast.success("Thank you for your valuable donation! Our volunteers will soon contact you");
        } catch (error) {
            toast.error(`Error adding book: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return { loading, createBook };
};

export default useCreateBook;
