import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slider.css"


import useBackground from '../hooks/useBackground';


const Aboutus = () => {
  const {isDark , setIsDark} = useBackground();

  return (
  <div className={`w-[90%] m-auto h-[90%] flex flex-col gap-2 overflow-y-auto ${!isDark?"text-white":""}`}>
    <h1 className='font-bold text-3xl'>OUR MISSION</h1>
    <h2 className='font-sans  text-left'>At BookBridge, our mission is to enhance educational opportunities for underprivileged children by facilitating the donation and distribution of books. We believe that every child deserves access to quality education, and through the power of books, we aim to unlock the potential of young minds. By connecting generous donors with NGOs and community organizations, we strive to bridge the gap between those who have books to give and those who need them the most.</h2>
    <h1 className='font-bold text-3xl'>WHAT DO WE DO</h1>
    <h2 className='font-sans text-left'>BookBridge is more than just a platform—it's a community dedicated to promoting literacy and lifelong learning. Since our inception, we've worked tirelessly to make book donations accessible and impactful. With streamlined processes and a user-friendly interface, we've empowered hundreds of donors to contribute to the education of thousands of children.
    Our project supports SDG 4: Quality Education by ensuring that children in underserved communities receive the resources they need to succeed in their studies. Whether it’s through individual book donations or large-scale literacy workshops, we’re making a tangible difference in the lives of children across the globe.</h2>
    <h1 className='font-bold text-3xl'>OUR PARTNERS</h1>
    <ul className='font-sans text-left'>
      <li>Bright Futures Trust</li>
      <li>Books of Hope Society</li>
      <li>Literacy Lifeline Association</li>
      <li>Children’s Literacy Alliance</li>
    </ul>
    <h1 className='font-bold text-3xl'>JOIN US</h1>
    <h2 className='font-sans text-left'>We’re always looking for passionate individuals to join our cause. Whether you’re interested in donating books, volunteering, or partnering with us, there’s a place for you in the BookBridge community. Together, we can make a difference, one book at a time.</h2>
  </div>
  );
}





export default Aboutus;
