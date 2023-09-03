import './Home.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import europe2 from '../../assets/europe2.jpg';

const Home = () => {
  return (
    <div className="home-container">
      <div className="background-image">
        <img src={europe2} alt="Europe Background" />
      </div>
      <div className="content">
        <h1>Welcome to Europe Sound Events</h1>
        <p>Your home for music events across Europe</p>
      </div>
    </div>
  );
};

export default Home;
