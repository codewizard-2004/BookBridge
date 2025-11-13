import { useState } from "react";
import { collection, addDoc, serverTimestamp , doc, updateDoc , arrayUnion} from "firebase/firestore";
import { firestore } from '../firebase/firebase'; // Adjust the path to your Firebase config
import useAuthStore from "../store/authStore"; 
import toast from "react-hot-toast";

const useFeedback = () => {
    const userUID = useAuthStore((state) => state.user);
    const [loading, setLoading] = useState(false);

    const createFeedback = async(feedback) => {
        setLoading(true);
        try {
            const  feedbackData = {
                feedback: feedback,
                senderId: userUID,
                createdAt: serverTimestamp()
            };

            const docRef = await addDoc(collection(firestore , "Feedbacks"),feedbackData);
            toast.success("Thank you for your valuable feedback");
        } catch (error) {
            toast.error(error.message);
            
        }finally{
            setLoading(false);
        }
    };

    return {loading , createFeedback};
}

export default useFeedback;