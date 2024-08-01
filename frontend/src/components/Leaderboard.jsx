import React from 'react'
import useBackground from '../hooks/useBackground';
import useTopUsers from '../hooks/useTopUsers';
import { CircularProgress } from '@mui/material';

const Leaderboard = ({darkmode}) => {
  const {isDark} = useBackground();
  const { topUsers, loading, error } = useTopUsers();
  return (
    <>

            <div id='leaderboard' className={` sm:w-[30%] w-[99%] sm:h-64 sm:ml-0 ml-1 ${!isDark?"bg-slate-500":"bg-white"} rounded-lg shadow-lg transition-all duration-500 ease-custom border-4
             border-transparent ${!isDark?"hover:border-blue-50":"hover:border-blue-600"} ${!isDark?"text-white":""} mt-5`}>
                <h1 className='text-2xl font-bold'>TOP DONATERS</h1>
                <ul>
                  {topUsers.map((user, index) => (
                    <li key={index} className='flex justify-between ml-3 mt-2 mr-3 hover:bg-slate-300 border-b-2'>
                      <span>{index+1}.</span><span>{user.fullname}</span><span>{user.booksCount}</span>
                    </li>
                  ))}
                </ul>



             </div>
    </>

      
  )
}

export default Leaderboard
{/* <li className='flex justify-between ml-3 mt-2 mr-3 hover:bg-slate-300 border-b-2'><span>1.</span><span>Amal Varghese</span><span>96</span></li> */}