import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import EmailIcon from '@mui/icons-material/Email';
import InputAdornment from '@mui/material/InputAdornment';
import PasswordIcon from '@mui/icons-material/Password';
import Button from '@mui/material/Button';
import ImageSection from '../components/ImageSection'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import useLogin from '../hooks/useLogin';
import CircularProgress from '@mui/material/CircularProgress';


const Login = () => {

  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");

  const { loading, error, login } = useLogin();

  const handleSubmit = async(e)=> {
    e.preventDefault()
    if (!email || !password) {
      toast.error("Fill all inputs");
      return;
    }
    await login(email, password);
  }
  return (
    <div className='flex flex-wrap h-[500px] w-[900px] rounded-xl bg-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] '>
      <div id='form-control-section' className='flex flex-col w-[100%] h-[100%] rounded-xl sm:w-[50%]'>
        <h1 className='text-3xl'>Welcome to </h1>
        <span className='text-blue-400 text-5xl font-bold'>BookBridge</span>
        <form onSubmit={handleSubmit}>
          <TextField id="outlined-basic2"  label="E-mail" 
          value={email}
          onChange={(e)=>{setEmail(e.target.value)}}
          InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon/>
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

        

        

          
        <Button variant="contained" type="submit" sx={{mt:3, width:"80%"}}>
          {loading ? <CircularProgress sx={{width: "10px" , color:"white"}}/> : 'LOGIN'}
        </Button>

        </form>

        <Link to='/signup'>
          <span className='text-blue-400 mt-1 hover:underline'>New here? Create an account</span>
        </Link>
      </div>
      <div id='image-container' className='w-[50%] rounded-tr-xl rounded-br-xl hidden sm:block '>
        <ImageSection/>
      </div>
      
    </div>
  )
}

export default Login
