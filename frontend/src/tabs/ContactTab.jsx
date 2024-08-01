import React, { useState } from 'react'
import {CircularProgress, TextField} from '@mui/material'
import { Button } from '@mui/material'
import useBackground from '../hooks/useBackground';
import toast, { Toaster } from 'react-hot-toast';
import useFeedback from '../hooks/useFeedback';


export const ContactTab = () => {
    const [feedback , setFeedback] = useState("");
    const {loading , createFeedback} = useFeedback();

    function countWords(str) {
        // Trim the string to remove any leading or trailing whitespace
        str = str.trim();
    
        // Check if the string is empty after trimming
        if (str === "") {
            return 0;
        }
    
        // Split the string into words using a regular expression
        const wordsArray = str.split(/\s+/);
        console.log(wordsArray.length)
    
        // Return the length of the words array
        return wordsArray.length;
    }

    const handleSubmit = (e)=> {
        e.preventDefault();
        if (!feedback || countWords(feedback)<10 ){ 
            toast.error("Please input a feedback more than 10 words");
            return;
        }
        toast.success("Thank you for sharing your feedback with us");
        createFeedback(feedback);

    }
    const {isDark} = useBackground();
  return (
    <div className='flex flex-col w-full flex-wrap'>
        <div id='feedback-form' className='flex flex-col items-center justify-center  mt-5 min-w-[50%]'>
            <h1 className={`text-2xl font-semibold ${!isDark?"text-white":""}`}>Your Feedbacks are valuable to us</h1>
            <form className='flex flex-col w-[60%]' onSubmit={handleSubmit}>
                <TextField id="outlined-basic1" fullWidth multiline rows={7}
                    label="Describe your experience using this platform" 
                    value={feedback}
                    onChange={(e)=>{setFeedback(e.target.value)}}
                    variant="outlined" sx={{
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
                <Button variant="contained" type='submit' fullWidth sx={{mt:2}}>{
                    loading? <CircularProgress sx={{color:"white"}}/>:<span>
                        Submit Your feedback
                    </span>
                }</Button>
            </form>
        </div>
        <div className='flex gap-5' id='icon-container'></div>
        {/* <div id='customer-service' className='flex justify-center items-center w-[40%]'>
            <img src={Customergirl} alt="" className='mt-10 h-3/5 '/>
        </div> */}
        <Toaster/>
    </div>
  )
}
