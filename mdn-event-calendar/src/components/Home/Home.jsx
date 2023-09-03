import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const Home = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const eventLocations = [
      { name: 'London', location: [51.505, -0.09], event: 'London Music Festival' },
      { name: 'Paris', location: [48.8566, 2.3522], event: 'Paris Music Expo' },
      // Добавете още градове и събития
    ];

    if (!mapRef.current) {
      // Инициализирайте картата само ако не е вече инициализирана
      const map = L.map('map').setView([51.505, -0.09], 5);
      mapRef.current = map;

      eventLocations.forEach((eventLocation) => {
        const marker = L.marker(eventLocation.location).addTo(map);
        marker.on('click', () => {
          alert(`Event in ${eventLocation.name}: ${eventLocation.event}`);
        });
      });

      map.scrollWheelZoom.disable();
    }
  }, []);

  return (
    <div className="home-page">
      <div id="map" className="europe-image"></div>
      {/* Останалата част на вашия Home компонент */}
    </div>
  );
}

export default Home;
