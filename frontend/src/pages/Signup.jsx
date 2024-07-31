import React ,{useState} from 'react'
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import PasswordIcon from '@mui/icons-material/Password';
import Button from '@mui/material/Button';
import ImageSection from '../components/ImageSection'
import EmailIcon from '@mui/icons-material/Email';
import useAuthStore from "../store/authStore";
// import ReCAPTCHA from 'react-google-recaptcha';

import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

import {auth ,firestore} from '../firebase/firebase';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
// import useSignUpWithEmailAndPassword from '../hooks/useSignUpWithEmailAndPassword';
import { doc, setDoc, serverTimestamp, collection, query, where, getDocs } from 'firebase/firestore';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchSignInMethodsForEmail } from 'firebase/auth';



const Signup = () => {
  const [email , setEmail] = useState("");
  const [fname , setFname] = useState("");
  const [password , setPassowrd] = useState("");
  const [confpass , setConfpass ] = useState("");
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
  const loginUser = useAuthStore((state) => state.login);



  const handleSubmit = async(e)=> {
    e.preventDefault()
    if (!email || !fname || !password || !confpass) {
      toast.error("Fill all inputs");
      return;
    }
    if (password.length<5){
      toast.error("Password length should be atleat 5");
      return
    }
    if (password != confpass) {
      toast.error("passwords do not match")
      return;
    }

    try {
      //check if email is already in use
      const usersRef = collection(firestore, 'Users');
      const q = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        toast.error("Email already registered");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(email, password);
      if (userCredential) {
        const user = userCredential.user;
        await setDoc(doc(firestore, 'Users', user.uid), {
          fullname: fname,
          email: user.email,
          createdAt: serverTimestamp(),
          address: null,
          books: []
        });
        localStorage.setItem("user-info", JSON.stringify({ fullname: fname, email: user.email, uid: user.uid }));
        loginUser({ fullname: fname, email: user.email, uid: user.uid});
        toast.success("Account created");
      }
      else{toast.error("bad input data")}
    } catch (error) {
      console.error("Error signing up:", error);
    }
    
    
  }
  return (
    <div className='flex flex-wrap h-[500px] w-[900px] rounded-xl bg-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] '>
      <div id='form-control-section' className='flex flex-col w-[100%] h-[100%] rounded-xl sm:w-[50%]'>
        <h1 className='text-3xl'>Welcome to </h1>
        <span className='text-blue-400 text-5xl font-bold'>BookBridge</span>
        <form onSubmit={handleSubmit}>
          <TextField id="outlined-basic1"  label="E-mail"
          value={email}
          onChange={(e)=>{setEmail(e.target.value)}}
          InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon/>
            </InputAdornment>
          ),
        }} variant="outlined" sx={{mt:2 , width:"80%"}}/>


          <TextField id="outlined-basic2"  label="Full Name"
          value={fname}
          onChange={(e)=>{setFname(e.target.value)}} 
          InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }} variant="outlined" sx={{mt:2 , width:"80%"}}/>

          <TextField id="outlined-basic3"  label="password" type='password'
          value={password}
          onChange={(e)=>{setPassowrd(e.target.value)}}
          InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PasswordIcon/>
            </InputAdornment>
          ),
        }} variant="outlined" sx={{mt:2 , width:"80%"}}/>

          <TextField id="outlined-basic4"  label="confirm password" type='password'
          value={confpass}
          onChange={(e)=>{setConfpass(e.target.value)}}
          InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PasswordIcon/>
            </InputAdornment>
          ),
        }} variant="outlined" sx={{mt:2 , width:"80%"}}/>
          
          <Button variant="contained" type="submit" sx={{mt:1, width:"80%"}}>
          {loading ? <CircularProgress sx={{width: "10px"}}/> : 'Create Account'}
          </Button>

        </form>

        <Link to="/login" >
          <span className='text-blue-400 mt-1 hover:underline'>Already have an account? Login</span>
        </Link>
      </div>
      <div id='image-container' className='w-[50%] rounded-tr-xl rounded-br-xl hidden sm:block '>
        <ImageSection/>
      </div>
      
    </div>
  )
}

export default Signup
