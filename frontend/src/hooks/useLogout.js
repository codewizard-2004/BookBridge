import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import toast from "react-hot-toast";
import useAuthStore from "../store/authStore";

const useLogout = () => {
	const [signOut, isLoggingOut, error] = useSignOut(auth);
    const logoutUser = useAuthStore((state) => state.logout);


	const handleLogout = async () => {
		try {
			await signOut();
			localStorage.removeItem("user-info");
            console.log("logged Out");
		} catch (error) {
			toast.error(error.message)
		}
	};

	return { handleLogout, isLoggingOut, error };
};

export default useLogout;