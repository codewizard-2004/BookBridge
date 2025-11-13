import React, { useState, useEffect } from 'react'
import {TextField, Autocomplete, Card, CardMedia, CardContent, Typography} from '@mui/material'
import { Button } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
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
import { searchBookByTitle, extractBookInfo } from '../lib/openLibrary';

const DonateTab = () => {
    const {isDark} = useBackground();
    const [bookname ,setBookname] = useState("");
    const [author , setAuthor] = useState("");
    const [desc , setDesc] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [coverUrl, setCoverUrl] = useState("");
    const [isbn, setIsbn] = useState("");

    const {loading , createBook} =  useCreateBook();

    useEffect(() => {
        const searchBooks = async () => {
            if (bookname.length > 2) {
                setSearchLoading(true);
                const results = await searchBookByTitle(bookname, author);
                setSearchResults(results.slice(0, 5));
                setSearchLoading(false);
            } else {
                setSearchResults([]);
            }
        };

        const debounce = setTimeout(searchBooks, 500);
        return () => clearTimeout(debounce);
    }, [bookname, author]);

    const handleBookSelect = (book) => {
        const bookInfo = extractBookInfo(book);
        if (bookInfo) {
            setSelectedBook(book);
            setBookname(bookInfo.title);
            setAuthor(bookInfo.author);
            setCoverUrl(bookInfo.coverUrl || "");
            setIsbn(bookInfo.isbn || "");
        }
    };

    const handleSubmit = async(e)=> {
        e.preventDefault();
        if (!bookname || !author || !desc) {
            toast.error("Please input Required fields.")
            return
       }
       if (bookname.length <3 || author.length<3 ||desc.length<5){
            toast.error("Minimum length of name and author is 3");
            return
       }
       await createBook(bookname, author, desc, coverUrl, isbn);
       setBookname("");
       setAuthor("");
       setDesc("");
       setCoverUrl("");
       setIsbn("");
       setSelectedBook(null);
    }
  return (
    <>
    <div id='donate-tab-main-container' className='flex flex-col lg:flex-row w-full px-4 gap-8'>
        <div id='form-container' className='flex flex-col items-center justify-center mt-5 lg:w-1/2 w-full'>
            <h1 className={`text-3xl font-bold mb-6 ${!isDark?"text-white":"text-gray-800"}`}>Donate a Book</h1>
            <form className='w-full max-w-lg' onSubmit={handleSubmit}>
                <Autocomplete
                    freeSolo
                    options={searchResults}
                    loading={searchLoading}
                    getOptionLabel={(option) =>
                        typeof option === 'string' ? option : `${option.title} ${option.author_name?.[0] || ''}`
                    }
                    onChange={(event, newValue) => {
                        if (newValue && typeof newValue !== 'string') {
                            handleBookSelect(newValue);
                        }
                    }}
                    inputValue={bookname}
                    onInputChange={(event, newInputValue) => {
                        setBookname(newInputValue);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search Book Name"
                            InputProps={{
                                ...params.InputProps,
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{color:!isDark?"white":""}}/>
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <React.Fragment>
                                        {searchLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </React.Fragment>
                                ),
                            }}
                            sx={{
                                mt: 2,
                                ...( !isDark && {
                                    '& .MuiOutlinedInput-root': {
                                        color: 'white',
                                        '& fieldset': { borderColor: 'white' },
                                        '&:hover fieldset': { borderColor: 'white' },
                                        '&.Mui-focused fieldset': { borderColor: 'white' },
                                    },
                                    '& .MuiInputLabel-root': { color: 'white' },
                                    '& .MuiInputLabel-root.Mui-focused': { color: 'white' }
                                })
                            }}
                        />
                    )}
                />

                <TextField fullWidth label="Author Name" value={author}
                    onChange={(e)=>{setAuthor(e.target.value)}}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <CreateIcon sx={{color:!isDark?"white":""}}/>
                            </InputAdornment>
                        ),
                    }}
                    variant="outlined"
                    sx={{
                        mt: 2,
                        ...( !isDark && {
                            '& .MuiOutlinedInput-root': {
                                color: 'white',
                                '& fieldset': { borderColor: 'white' },
                                '&:hover fieldset': { borderColor: 'white' },
                                '&.Mui-focused fieldset': { borderColor: 'white' },
                            },
                            '& .MuiInputLabel-root': { color: 'white' },
                            '& .MuiInputLabel-root.Mui-focused': { color: 'white' }
                        })
                    }}
                />

                <TextField fullWidth multiline rows={4} value={desc}
                    onChange={(e)=>{setDesc(e.target.value)}}
                    label="Describe the book condition"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <DescriptionIcon sx={{color:!isDark?"white":""}}/>
                            </InputAdornment>
                        ),
                    }}
                    variant="outlined"
                    sx={{
                        mt: 2,
                        ...( !isDark && {
                            '& .MuiOutlinedInput-root': {
                                color: 'white',
                                '& fieldset': { borderColor: 'white' },
                                '&:hover fieldset': { borderColor: 'white' },
                                '&.Mui-focused fieldset': { borderColor: 'white' },
                            },
                            '& .MuiInputLabel-root': { color: 'white' },
                            '& .MuiInputLabel-root.Mui-focused': { color: 'white' }
                        })
                    }}
                />

                {coverUrl && (
                    <Card sx={{ mt: 3, maxWidth: 200, mx: 'auto' }}>
                        <CardMedia
                            component="img"
                            height="250"
                            image={coverUrl}
                            alt={bookname}
                            sx={{ objectFit: 'cover' }}
                        />
                        <CardContent>
                            <Typography variant="caption" color="text.secondary">
                                Book Cover Preview
                            </Typography>
                        </CardContent>
                    </Card>
                )}

                <Button
                    variant="contained"
                    type='submit'
                    fullWidth
                    sx={{
                        mt: 3,
                        py: 1.5,
                        fontSize: '1.1rem',
                        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                        '&:hover': {
                            background: 'linear-gradient(45deg, #1976D2 30%, #2196F3 90%)',
                        }
                    }}
                >
                    {loading ? <CircularProgress sx={{color:"white"}}/> : 'Donate Book'}
                </Button>
            </form>
        </div>
        <div id='earth-container' className='hidden lg:flex flex-col lg:w-1/2 w-full justify-center items-center'>
            <Earth/>
            <span className='text-xl mt-2 font-semibold text-center text-white'>Our Volunteers will collect books across India</span>
            <div id='address-box' className='mt-5'><SocialForm/></div>
        </div>
        <Toaster />
        
      
    </div>
    </>
  )
}

export default DonateTab
