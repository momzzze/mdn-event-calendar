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
import { useData } from './contexts/DataContext';
import AdminDashboard from './components/Admin/AdminDashboard';

function App() {
  const { user, userData, isAuthenticated,isAdmin } = useAuth();
  const { users } = useData()
  return (
    <>
      {isAuthenticated ?
        (<>
          <Navbar isAuthenticated={isAuthenticated} />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/events" element={<Events />} />
            <Route path="/calendar" element={<Calendar />} />
            {isAdmin && <Route path="/admin" element={<AdminDashboard />} />}
          </Routes>
        </>) :
        (
          <Routes>
            <Route path="/" element={<LandingPage />} />
          </Routes>
        )}
    </>
  )
}

export default App
