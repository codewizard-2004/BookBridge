import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slider.css"

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Button } from '@mui/material';
import useBackground from '../hooks/useBackground';


const Aboutus = () => {
  const {isDark , setIsDark} = useBackground();

  return (
  <div className={`w-[90%] m-auto h-[90%] flex flex-col gap-2 ${!isDark?"text-white":""}`}>
    <h1 className='font-bold mt-5 text-3xl'>OUR MISSION</h1>
    <h2 className='font-sans font-semibold text-left'>At BookBridge, our mission is to enhance educational opportunities for underprivileged children by facilitating the donation and distribution of books. We believe that every child deserves access to quality education, and through the power of books, we aim to unlock the potential of young minds. By connecting generous donors with NGOs and community organizations, we strive to bridge the gap between those who have books to give and those who need them the most.</h2>
    <h1 className='font-bold mt-5 text-3xl'>WHAT DO WE DO</h1>
    <h2 className='font-sans font-semibold text-left'>BookBridge is more than just a platform—it's a community dedicated to promoting literacy and lifelong learning. Since our inception, we've worked tirelessly to make book donations accessible and impactful. With streamlined processes and a user-friendly interface, we've empowered hundreds of donors to contribute to the education of thousands of children.
    Our project supports SDG 4: Quality Education by ensuring that children in underserved communities receive the resources they need to succeed in their studies. Whether it’s through individual book donations or large-scale literacy workshops, we’re making a tangible difference in the lives of children across the globe.</h2>
    <h1 className='font-bold mt-5 text-3xl'>JOIN US</h1>
    <h2 className='font-sans font-semibold text-left'>We’re always looking for passionate individuals to join our cause. Whether you’re interested in donating books, volunteering, or partnering with us, there’s a place for you in the BookBridge community. Together, we can make a difference, one book at a time.</h2>

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
    img: `/students/image-2.jpeg`,
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
