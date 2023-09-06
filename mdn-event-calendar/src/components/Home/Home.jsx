import './Home.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import europe2 from '../../assets/europe2.jpg';
import AnimatedText from "./Animated";
import Footer from '../Footer/Footer';

const Home = () => {
  return (
    <div className="home-main-container">
      <div className="home-container">
        <div className="background-image">
          <img src={europe2} alt="Europe Background" />
        </div>
        <div>
          <AnimatedText /> 
          <h1 style={{ fontWeight: 'bolder', fontStyle: 'italic', fontSize: '25px'}}>Project by M.D.N. Team</h1>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
