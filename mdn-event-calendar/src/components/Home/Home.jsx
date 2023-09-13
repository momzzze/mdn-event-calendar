import "./Home.css";
import "leaflet/dist/leaflet.css";
import AnimatedText from "./Animated";
import WeatherApp from "../Weather/WeatherApp";
import CalendarHome from "./CalendarHome/CalendarHome";
import { useAuth } from "../../contexts/AuthContext";
import dayjs from "dayjs";
import ScheduleHome from "./ScheduleHome/ScheduleHome";

const Home = () => {
  const { userData } = useAuth();
  const currentDate = dayjs();

  return (
    <div className="home-container  bg-gray-100 p-4 rounded-lg shadow-md mb-16">
      <div className="welcome-section mb-6 bg-purple-800 rounded-full">
        <h2 className="text-2xl  font-semibold text-white">
          Welcome back, {userData?.username}!
        </h2>
        <p className="text-white">
          <AnimatedText />
        </p>
      </div>
      <div className="grid grid-cols-5 gap-3 mx-3">
        <div className="start-col-1 col-span-2 grid gap-6 content-section place-items-center bg-white p-4 rounded-lg shadow-md mb-6 p-12 md:p-6">
          <WeatherApp city={userData?.city} />
          <CalendarHome />
        </div>
        <div className="start-col-3 col-span-3 content-section bg-white p-4 rounded-lg shadow-md mb-6">
          <h1 className="text-4xl font-bold text-purple-800 mb-10">
            Upcoming Events For This Week
          </h1>
          <div className="h-4/5 w-full">
            <ScheduleHome today={currentDate} />
          </div>
        </div>
      </div>
      <div className="w-1/2"></div>
    </div>
  );
};

export default Home;

{
  /* <div className="background-image">
          <img src={europe2} alt="Europe Background" />
           <p style={{ fontWeight: 'bolder', fontStyle: 'italic', fontSize: '25px' }}>
            Project by M.D.N. Team
          </p>
        </div> */
}
