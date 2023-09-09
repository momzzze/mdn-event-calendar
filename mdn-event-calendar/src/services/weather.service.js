const API_KEY = '7db799d7948244dfb87212857230909'; 
const BASE_URL = 'https://api.weatherapi.com/v1';

export async function fetchWeatherData(city) {
    try {
        const response = await fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=5`);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
      }
}