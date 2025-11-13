import { useState } from "react";
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";
import useAuthStore from "../store/authStore";

const useLogout = () => {
	const [isLoggingOut, setIsLoggingOut] = useState(false);
	const [error, setError] = useState(null);
    const logoutUser = useAuthStore((state) => state.logout);

	const handleLogout = async () => {
		setIsLoggingOut(true);
		setError(null);
		try {
			const { error } = await supabase.auth.signOut();
			if (error) throw error;

			localStorage.removeItem("user-info");
			logoutUser();
			toast.success("Logged out successfully");
		} catch (err) {
			setError(err.message);
			toast.error(err.message);
		} finally {
			setIsLoggingOut(false);
		}
	};

	return { handleLogout, isLoggingOut, error };
};

export default useLogout;
