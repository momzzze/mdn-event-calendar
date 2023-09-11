import './Home.css';
import 'leaflet/dist/leaflet.css';
import AnimatedText from "./Animated";
import WeatherApp from '../Weather/WeatherApp';
import { useAuth } from '../../contexts/AuthContext';
import MonthCalendarLandingPage from '../LandingPage/Calendar/MonthCalendarLandingPage';

const Home = () => {
  const { userData } = useAuth();
  return (
    <div className="home-container  bg-gray-100 p-4 rounded-lg shadow-md mb-16">
      <div className="welcome-section mb-6 bg-purple-800 rounded-full">
        <h2 className="text-2xl  font-semibold text-white">Welcome back, {userData?.username}!</h2>
        <p className="text-white">
          <AnimatedText />
        </p>
      </div>
      <div className="w-1/2 pr-4">
        <div className="content-section bg-white p-4 rounded-lg shadow-md mb-6">
          <WeatherApp city={userData?.city} />
          <MonthCalendarLandingPage />
        </div>
      </div>
      <div className="w-1/2">
      </div>
    </div>
  );
};

export default Home;

{/* <div className="background-image">
          <img src={europe2} alt="Europe Background" />
           <p style={{ fontWeight: 'bolder', fontStyle: 'italic', fontSize: '25px' }}>
            Project by M.D.N. Team
          </p>
        </div> */}