import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth';
import Home from './components/Home/Home'
import LandingPage from './components/LandingPage/LandingPage'
import Calendar from './components/Calendar/Calendar'
import Contacts from './components/Contacts/Contacts'
import Events from './components/Events/Events'
import SignUp from './components/Auth/Register/Signup'
import { useAuth } from './contexts/AuthContext'
import { getUserData } from './services/user.service';
import { auth } from './config/firebase';
import SignIn from './components/Auth/Login/Signin';

function App() {
  const { user, userData,isAuthenticated } = useAuth();
  return (
    <>
      {isAuthenticated === false ?
        (
          <Routes>
            <Route path="/landing" element={<LandingPage />}/>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        ) :
        (<>
          <Navbar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/events" element={<Events />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </>)
      }
    </>
  )
}

export default App
