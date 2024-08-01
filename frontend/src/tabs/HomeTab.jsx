import React from 'react'
import StatsCard from '../components/StatsCard'
import Charts from '../components/Charts'
import DonationStats from '../components/DonationStats'
import Leaderboard from '../components/Leaderboard'
import Latest from '../components/Latest'
import useBackground from '../hooks/useBackground';

const HomeTab = () => {
  const {isDark} = useBackground();


  return (
    <div className={`flex flex-col ${!isDark?"bg-slate-800":""}`}>
      <div id='stats-container'>
        <StatsCard/>
      </div>
            
        <div className='flex flex-col w-[100%] items-center justify-center' id='chart-container'>
            <Charts/>
        </div>
        <div id='donation-stats-container' className='flex sm:flex-row flex-col items-center pb-5 w-[100%] justify-center pt-10 gap-10'>
            <DonationStats Title={"1500+ Books Donated"} description={"Over 1500 books generously donated to support children's education."}/>
            <DonationStats Title={"1000+ Children Benefited"} description={"More than 1000 children have received educational resources through our initiative."}/>
            <DonationStats Title={"Community: 750+ Donors"} description={"Engaged 200+ dedicated volunteers in book collection and distribution activities."}/>
        </div>

        <div className='flex sm:flex-row flex-col justify-center mb-5 gap-5' id='leaderboard-container'>
            <Leaderboard/>
            <Latest/>
        </div>
        
        
        
      
    </div>
  )
}

export default HomeTab
