import './App.css'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import LandingPage from './components/LandingPage/LandingPage'
import Calendar from './components/Calendar/Calendar'
import Contacts from './components/Contacts/Contacts'
import { useAuth } from './contexts/AuthContext'
import { useData } from './contexts/DataContext';
import AdminDashboard from './components/Admin/AdminDashboard';
import ListEvents from './components/Events/ListEvents/ListEvents';
import SingleComponent from './components/Events/Components/SingleComponent';

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
            <Route path="/events" element={<ListEvents />} />
            <Route path="/event/:eventId" element={<SingleComponent />} />
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
