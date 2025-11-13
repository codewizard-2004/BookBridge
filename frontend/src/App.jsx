import './App.css'
import React from 'react'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'

import  { Toaster } from 'react-hot-toast';

import { Navigate , Route , Routes } from 'react-router-dom'

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";

function App() {
  const [authUser] = useAuthState(auth);

  return (
  
    <div className='p-4 h-screen w-screen flex flex-wrap items-center justify-center' id='main-container'>
      <Routes>
        <Route path='/' element={authUser?<Home/>:<Navigate to="/login"/>}/>
        <Route path='/login' element={!authUser?<Login/>:<Navigate to="/"/>}/>
        <Route path='/signup' element={!authUser?<Signup/>:<Navigate to="/"/>}/>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
