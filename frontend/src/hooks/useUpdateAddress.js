import { useState } from "react";
import { supabase } from '../lib/supabase';
import useAuthStore from "../store/authStore";
import toast from "react-hot-toast";

const useUpdateAddress = ()=>{
    const userUID = useAuthStore((state) => state.user);
    const [loading , setLoading] = useState(false);

    const updateAddress = async(address)=>{
        setLoading(true)
        try {
            const { error } = await supabase
                .from('users')
                .update({ address: address })
                .eq('id', userUID);

            if (error) throw error;

            toast.success("Address updated successfully")
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    return {loading , updateAddress}
}

export default useUpdateAddress;
