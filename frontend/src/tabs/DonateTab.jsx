import React, { useState } from 'react'
import {TextField} from '@mui/material'
import { Button } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
import './DonateTab.css'
import { SocialForm } from '../components/SocialForm';

import toast, { Toaster } from 'react-hot-toast';




import BookIcon from '@mui/icons-material/Book';
import CreateIcon from '@mui/icons-material/Create';
import DescriptionIcon from '@mui/icons-material/Description';
import Earth from '../components/Earth';
import useBackground from '../hooks/useBackground';

const DonateTab = () => {
    const {isDark} = useBackground();
    const [bookname ,setBookname] = useState("");
    const [author , setAuthor] = useState("");
    const [address , setAddress] = useState("");

    const handleSubmit = (e)=> {
        e.preventDefault();
        if (!bookname || !author || !address) {
            toast.error("Please input Required fields.")
            return
       }
       if (bookname.length <3 || author.length<3 ||address.length<5){
            toast.error("Minium length of name and author is 3");
            return
       }
       toast.success("Request accepted")


    }
  return (
    <>
    <div id='donate-tab-main-container' className='flex w-[100%] '>
        <div id='form-container' className='flex flex-col items-center justify-center ml-5 mt-5 w-[50%]'>
            <h1 className={`text-2xl font-semibold ${!isDark?"text-white":""}`}>Donate a Book for the needy❤️</h1>
            <form className='w-[50%]' onSubmit={handleSubmit}>
                <TextField id="outlined-basic1" fullWidth  label="Enter Book Name" value={bookname} 
                    onChange={(e)=>{setBookname(e.target.value)}}
                    InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <BookIcon sx={{color:!isDark?"white":""}}/>
                    </InputAdornment>),
                }} variant="outlined" sx={{
                    mt: 3,
                    ...( !isDark && {
                        '& .MuiOutlinedInput-root': {
                            color: 'white',
                            '& fieldset': {
                                borderColor: 'white',
                            },
                            '&:hover fieldset': {
                                borderColor: 'white',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'white',
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: 'white',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: 'white',
                        }
                    })
                }}/>

                <TextField id="outlined-basic1" fullWidth  label="Enter Author Name" value={author} 
                    onChange={(e)=>{setAuthor(e.target.value)}} InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <CreateIcon sx={{color:!isDark?"white":""}}/>
                    </InputAdornment>),
                }} variant="outlined" sx={{
                    mt: 3,
                    ...( !isDark && {
                        '& .MuiOutlinedInput-root': {
                            color: 'white',
                            '& fieldset': {
                                borderColor: 'white',
                            },
                            '&:hover fieldset': {
                                borderColor: 'white',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'white',
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: 'white',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: 'white',
                        }
                    })
                }}/>

                <TextField id="outlined-basic1" fullWidth multiline rows={4} maxRows={5} value={address} 
                    onChange={(e)=>{setAddress(e.target.value)}}
                label="write your address" InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <DescriptionIcon sx={{color:!isDark?"white":""}}/>
                    </InputAdornment>),
                }} variant="outlined" sx={{
                    mt: 3,
                    ...( !isDark && {
                        '& .MuiOutlinedInput-root': {
                            color: 'white',
                            '& fieldset': {
                                borderColor: 'white',
                            },
                            '&:hover fieldset': {
                                borderColor: 'white',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'white',
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: 'white',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: 'white',
                        }
                    })
                }}/>

                <Button variant="contained" type='submit' fullWidth sx={{mt:2}}>Donate❤️</Button>
            </form>
        </div>
        <div id='earth-container' className='flex flex-col w-[40%] h-[50%] justify-center items-center'>
            <Earth/>
            <span className='text-xl mt-2 font-semibold text-white'>Our Volunteers will collect books across India</span>
            <div id='address-box' className='mt-5'><SocialForm/></div>
        </div>
        <Toaster />
        
      
    </div>
    </>
  )
}

export default DonateTab
