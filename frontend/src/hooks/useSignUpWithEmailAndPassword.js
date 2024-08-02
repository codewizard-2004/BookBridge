import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth} from "../firebase/firebase";

const useSignUpWithEmailAndPassword = () => {
    const [createUserWithEmailAndPassword, 
        user ,
        loading,
        error] = useCreateUserWithEmailAndPassword(auth);
	
	const signup = async({email ,fname, password})=>{
        try {
            const newUser = await createUserWithEmailAndPassword(email , fname, password);
            if (!newUser &&error){
                console.log(error);
                return;
            }
            if (newUser){
                return 1;
            }
        } catch (error) {
            console.log(error)
        }
    }
  
    return {loading , error ,signup}
}

export default useSignUpWithEmailAndPassword
