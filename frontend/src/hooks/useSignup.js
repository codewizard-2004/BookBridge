import { useState } from "react";
import { supabase } from "../lib/supabase";
import useAuthStore from "../store/authStore";
import toast from "react-hot-toast";

const useSignup = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const loginUser = useAuthStore((state) => state.login);

	const signup = async (email, fullname, password) => {
		setLoading(true);
		setError(null);
		try {
			const { data: authData, error: signUpError } = await supabase.auth.signUp({
				email,
				password,
			});

			if (signUpError) throw signUpError;

			if (authData.user) {
				const { error: insertError } = await supabase
					.from('users')
					.insert([
						{
							id: authData.user.id,
							email: authData.user.email,
							fullname: fullname,
							address: null,
						}
					]);

				if (insertError) throw insertError;

				localStorage.setItem("user-info", JSON.stringify(authData.user.id));
				loginUser(authData.user.id);
				toast.success("Account created successfully!");
			}
		} catch (err) {
			setError(err.message);
			toast.error(err.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, error, signup };
};

export default useSignup;
