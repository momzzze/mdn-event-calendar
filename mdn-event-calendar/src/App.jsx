import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import LandingPage from './components/LandingPage/LandingPage'
import Calendar from './components/Calendar/Calendar'
import Contacts from './components/Contacts/Contacts'
import Events from './components/Events/Events'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/landing" element={<LandingPage />} />  {/* soon should be homePage for anonymous */}
        <Route path="/contacts" element={<Contacts />} />        
        <Route path="/events" element={<Events />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </>
  )
}

export default App
