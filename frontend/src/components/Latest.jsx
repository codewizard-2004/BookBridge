import React from 'react'
import useBackground from '../hooks/useBackground';
import useNewestBooks from '../hooks/useNewestBooks';

const Latest = () => {
  const {isDark} = useBackground();
  const {loading , newestBooks} = useNewestBooks();
  return (
    <>

            <div id='latestbooks' className={`sm:w-[30%] w-[99%] sm:h-64 sm:ml-0 ml-1 ${!isDark?"bg-slate-500":"bg-white"} rounded-lg shadow-lg transition-all duration-500 ease-custom border-4
             border-transparent ${!isDark?"hover:border-blue-50":"hover:border-blue-600"} ${!isDark?"text-white":""} mt-5`}>
                <h1 className='text-2xl font-bold'>LATEST DONATIONS</h1>
                <ul className='mt-5'>
                  {
                    newestBooks.map((book ,index)=>(
                      <li key={index} className='flex justify-between ml-3 mt-2 mr-3 hover:bg-slate-300 border-b-2'><span>{index+1}</span><span>{book.title}</span><span>{book.createdAt}</span></li>
                    ))
                  }

                    {/* <li className='flex justify-between ml-3 mt-2 mr-3 hover:bg-slate-300 border-b-2'><span>1.</span><span>Harry Potter</span><span>24/7/24</span></li> */}
                </ul>



             </div>
    </>
  )
}

export default Latest
