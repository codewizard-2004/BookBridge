import { useState } from "react";
import { supabase } from "../lib/supabase";
import useAuthStore from "../store/authStore";
import toast from "react-hot-toast";

const useLogin = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const loginUser = useAuthStore((state) => state.login);

	const login = async (email, password) => {
		setLoading(true);
		setError(null);
		try {
			const { data, error: signInError } = await supabase.auth.signInWithPassword({
				email,
				password,
			});

			if (signInError) throw signInError;

			if (data.user) {
				localStorage.setItem("user-info", JSON.stringify(data.user.id));
				loginUser(data.user.id);
				toast.success("Welcome back!");
			}
		} catch (err) {
			setError(err.message);
			toast.error(err.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, error, login };
};

export default useLogin;
