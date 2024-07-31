import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slider.css"

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Button } from '@mui/material';


const Aboutus = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };
  return (
  <div className='w-3/4 m-auto'>
    <div className='mt-10'>
     <Slider {...settings}>
       {data.map((d) => (
        <div className='bg-w h-[450px] text-black rounded-xl' id='image-container-slider'>
          <div className='rounded-t-xl  flex justify-center items-center h-[300px]'>
            <img src={d.img} alt='' className='h-60 w-60 rounded-full px-2 py-2'/>
          </div>
           <div className=' flex flex-col justify-center items-center gap-4 p-4'>
            <p className='text-xl font-semibold px-2 top-1'>{d.name}</p>
            <p className='top-1'>{d.review}</p>
            <div id='social-icons' className='flex'>
              <Button sx={{color: "white"}}><LinkedInIcon/></Button>
              <Button sx={{color: "white"}}><GitHubIcon/></Button>
              <Button sx={{color: "white"}}><InstagramIcon/></Button>
            </div>
           </div>

         </div>
        
      
      ))}
     </Slider> 
    </div>

  </div>
  );
}

const data = [
  {
    name: `Amal Varghese`,
    img: `/students/WhatsApp Image 2024-07-29 at 13.10.15.jpeg`,
    review: 'Perumbavoor'
  },
  {
    name: `Pranav Paul`,
    img: '/public/students/pranav.jpg',
    review: `Angamaly`
  },
  {
    name: `Adinath Manoj`,
    img: `/students/image-3.jpeg`,
    review: `Kannur`
  },
  {
    name: `Cebin Mec`,
    img: `/students/WhatsApp Image 2024-07-29 at 13.10.15.jpeg`,
    review: `Thudapuzha`
  },
  {
    name: `Alan M Varghese`,
    img: `/students/WhatsApp Image 2024-07-29 at 13.10.15.jpeg`,
    review: `Kollam`
  },
  
];



export default Aboutus;
