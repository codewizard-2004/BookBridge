import React ,{useState} from 'react'
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import PasswordIcon from '@mui/icons-material/Password';
import Button from '@mui/material/Button';
import ImageSection from '../components/ImageSection'
import EmailIcon from '@mui/icons-material/Email';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import useSignup from '../hooks/useSignup';
import CircularProgress from '@mui/material/CircularProgress';

const Signup = () => {
  const [email , setEmail] = useState("");
  const [fname , setFname] = useState("");
  const [password , setPassword] = useState("");
  const [confpass , setConfpass ] = useState("");
  const { loading, error, signup } = useSignup();

  const handleSubmit = async(e)=> {
    e.preventDefault()
    if (!email || !fname || !password || !confpass) {
      toast.error("Fill all inputs");
      return;
    }
    if (password.length<6){
      toast.error("Password length should be at least 6 characters");
      return
    }
    if (password !== confpass) {
      toast.error("Passwords do not match");
      return;
    }

    await signup(email, fname, password);
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
          onChange={(e)=>{setPassword(e.target.value)}}
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
          {loading ? <CircularProgress sx={{width: "10px"  , color:"white"}}/> : 'Create Account'}
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
