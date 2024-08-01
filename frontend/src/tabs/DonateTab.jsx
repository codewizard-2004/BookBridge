import React, { useState } from 'react'
import {TextField} from '@mui/material'
import { Button } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
import './DonateTab.css'
import { SocialForm } from '../components/SocialForm';

import toast, { Toaster } from 'react-hot-toast';
import CircularProgress from '@mui/material/CircularProgress';




import BookIcon from '@mui/icons-material/Book';
import CreateIcon from '@mui/icons-material/Create';
import DescriptionIcon from '@mui/icons-material/Description';
import Earth from '../components/Earth';
import useBackground from '../hooks/useBackground';
import useCreateBook from '../hooks/useCreateBook';

const DonateTab = () => {
    const {isDark} = useBackground();
    const [bookname ,setBookname] = useState("");
    const [author , setAuthor] = useState("");
    const [desc , setDesc] = useState("");

    const {loading , createBook} =  useCreateBook();

    const handleSubmit = async(e)=> {
        e.preventDefault();
        if (!bookname || !author || !desc) {
            toast.error("Please input Required fields.")
            return
       }
       if (bookname.length <3 || author.length<3 ||desc.length<5){
            toast.error("Minium length of name and author is 3");
            return
       }
       await createBook(bookname , author , desc);



    }
  return (
    <>
    <div id='donate-tab-main-container' className='flex w-[100%] '>
        <div id='form-container' className='flex flex-col items-center justify-center ml-5 mt-5 sm:w-[50%] w-full'>
            <h1 className={`text-2xl font-semibold ${!isDark?"text-white":""}`}>Donate a Book for the needy❤️</h1>
            <form className='sm:w-[50%] w-[90%]' onSubmit={handleSubmit}>
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

                <TextField id="outlined-basic1" fullWidth multiline rows={4} maxRows={5} value={desc} 
                    onChange={(e)=>{setDesc(e.target.value)}}
                label="Describe the book condition" InputProps={{
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

                <Button variant="contained" type='submit' fullWidth sx={{mt:2}}>{loading?<CircularProgress sx={{color:"white"}}/>:<span>Donate❤️</span>}</Button>
            </form>
        </div>
        <div id='earth-container' className='sm:flex hidden flex-col w-[40%] h-[50%] justify-center items-center'>
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
