import { useState, useEffect } from "react";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from '../firebase/firebase'; // Adjust the path to your Firebase config
import useAuthStore from "../store/authStore"; 
import toast from "react-hot-toast";


const useUpdateAddress = ()=>{
    const userUID = useAuthStore((state) => state.user);
    const [loading , setLoading] = useState(false);

    const updateAddress = async(address)=>{
        setLoading(true)
        try {
            const docRef = doc(firestore, 'Users', userUID);
            await setDoc(docRef , {address:address},{ merge: true })
            toast.success("Address Created")
        } catch (error) {
            toast.error(error.message)
            console.log(error.message)
        }finally{
            setLoading(false)
        }
    }
    return {loading , updateAddress}
}

export default useUpdateAddress;