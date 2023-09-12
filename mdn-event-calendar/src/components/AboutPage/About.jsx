
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-heading" style={{ color: 'black', fontWeight: 'bold' }}>
        ABOUT US
      </h1>
      <div className="about-description">
        <p style={{ color: 'black', fontWeight: 'bold' }}>
          M.D.N. Europe Sound Events is a project driven by future JavaScript developers
          with a passion for music and a vision to create unforgettable events.
          Our mission is to blend technology and music, creating experiences that
          resonate with music enthusiasts worldwide.
        </p>
        <p style={{ color: 'black', fontWeight: 'bold' }}>
          We believe in the power of music to bring people together, and we strive to
          create events that showcase the best of both the digital and musical worlds.
          Join us on our journey to create memorable sound experiences.
        </p>
      </div>
    </div>
  );
};

export default About;
