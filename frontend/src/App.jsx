import './App.css'
import React, { useEffect, useState } from 'react'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'

import  { Toaster } from 'react-hot-toast';

import { Navigate , Route , Routes } from 'react-router-dom'
import { supabase } from './lib/supabase'
import useAuthStore from './store/authStore'

function App() {
  const [loading, setLoading] = useState(true);
  const { user, login, logout } = useAuthStore();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        login(session.user.id);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      (async () => {
        if (session) {
          login(session.user.id);
        } else {
          logout();
        }
      })();
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className='p-4 h-screen w-screen flex flex-wrap items-center justify-center' id='main-container'>
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return (

    <div className='p-4 h-screen w-screen flex flex-wrap items-center justify-center' id='main-container'>
      <Routes>
        <Route path='/' element={user?<Home/>:<Navigate to="/login"/>}/>
        <Route path='/login' element={!user?<Login/>:<Navigate to="/"/>}/>
        <Route path='/signup' element={!user?<Signup/>:<Navigate to="/"/>}/>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
