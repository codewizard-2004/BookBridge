import React, { useState } from 'react'
import {Card, CircularProgress, TextField} from '@mui/material'
import { Button } from '@mui/material'
import useBackground from '../hooks/useBackground';
import toast, { Toaster } from 'react-hot-toast';
import useFeedback from '../hooks/useFeedback';
import Cards from '../components/Cards';



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
    <div className='flex flex-col w-full flex-wrap  overflow-y-visible'>
        <div id='feedback-form' className='flex flex-col items-center justify-center  mt-5 min-w-[50%]'>
            <h1 className={`text-2xl font-semibold ${!isDark?"text-white":""}`}>Your Feedbacks are valuable to us</h1>
            <form className='flex flex-col sm:w-[60%] w-[90%]' onSubmit={handleSubmit}>
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
        <Toaster/>
        <h1 className={`mt-5 font-semibold text-2xl ${!isDark?"text-white":""}`}>Contact Our Members</h1>
        <div id='contact-cards' className='flex items-center justify-center mt-5 gap-5 flex-wrap'>
                <Cards name={"Amal Varghese"}github={"https://github.com/codewizard-2004"} insta={"https://www.instagram.com/4mal_varghese/"} linkedin={"https://www.linkedin.com/in/amal-varghese-670225291/"} />
                <Cards name={"Pranav Paul"} linkedin={"https://www.linkedin.com/in/pranavpaul/"} insta={"https://www.instagram.com/pranav_paul_/"}/>
                <Cards name={"Adinath Manoj Nambiar"} linkedin={"https://www.linkedin.com/in/adinath-manoj-nambiar-3b1b75292/"} github={"https://github.com/adinath103"} insta={"https://www.instagram.com/adinath_manoj/"}/>
                <Cards name={"Alen M Varghese"} linkedin={"https://www.linkedin.com/in/alan-m-varghese-396002280/"} insta={"https://www.instagram.com/al._.xn._/"}/>
                <Cards name={"Cebin Jimson"} linkedin={"https://www.linkedin.com/in/cebin-jimson-1b93a7289/"} insta={"https://www.instagram.com/callmejimsaa/"}/>
        </div>
    </div>
  )
}
