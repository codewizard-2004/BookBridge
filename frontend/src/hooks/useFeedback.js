import { useState } from "react";
import { supabase } from '../lib/supabase';
import useAuthStore from "../store/authStore";
import toast from "react-hot-toast";

const useFeedback = () => {
    const userUID = useAuthStore((state) => state.user);
    const [loading, setLoading] = useState(false);

    const createFeedback = async(feedback) => {
        setLoading(true);
        try {
            const { error } = await supabase
                .from('feedbacks')
                .insert([
                    {
                        feedback: feedback,
                        sender_id: userUID,
                    }
                ]);

            if (error) throw error;

            toast.success("Thank you for your valuable feedback");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return {loading , createFeedback};
}

export default useFeedback;
