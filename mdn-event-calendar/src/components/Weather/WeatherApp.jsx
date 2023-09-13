import { useEffect, useState } from 'react';
import { fetchWeatherData } from '../../services/weather.service';
import { FaSun, FaCloud, FaCloudSun, FaCloudRain, FaCloudShowersHeavy } from 'react-icons/fa';
import { IoMdSunny } from 'react-icons/io';
import { findLocationByLatitudeAndLongitude } from '../../services/map.services';

const WeatherApp = ({ city }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [generatedCity, setGeneratedCity] = useState(null);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                setUserLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            });
        }
    }, []);

    useEffect(() => {
        async function getWeather() {
            try {
                if (city) {
                    const data = await fetchWeatherData(city);
                    setWeatherData(data);
                } else if (userLocation && generatedCity) {
                    const data = await fetchWeatherData(generatedCity); 
                    setWeatherData(data);
                } else {
                    const defaultCity = 'Sofia';
                    const data = await fetchWeatherData(defaultCity);
                    setWeatherData(data);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        getWeather();
    }, [city, userLocation, generatedCity]);

    useEffect(() => {
        if (userLocation) {
            findLocationByLatitudeAndLongitude(userLocation.latitude, userLocation.longitude)
                .then((city) => setGeneratedCity(city))
                .catch((error) => console.error('Error fetching generated city:', error));
        }
    }, [userLocation]);


    const weatherIcons = {
        'sunny': <FaSun />,
        'partly cloudy': <FaCloudSun />,
        'clear': <IoMdSunny />,
        'overcast': <FaCloud />,
        'cloudy': <FaCloud />,
        'rain': <FaCloudRain />,
        'showers': <FaCloudShowersHeavy />,
        'light rain': <FaCloudRain />,
        'light showers': <FaCloudShowersHeavy />,
    };
    if (weatherData === null) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500 border-opacity-50"></div>
            </div>
        );
    }
    return (
        <div className="flex justify-center xl:w-4/5 2xl:w-full">
            <div className="card min-w-md max-w-4xl border border-gray-100 bg-gray-50 transition-shadow test shadow-lg hover:shadow-shadow-xl w-full bg-purple-700 text-purple-50 rounded-md p-6">
                <h2 className="text-lg mb-4">
                    <div className="flex justify-between"> 
                        <div className="badge relative top-0">
                            <span className="font-semibold text-5xl">
                                {weatherData?.location?.name}
                            </span>
                        </div>
                        <span className="text-xl font-bold">
                            {weatherData?.current.last_updated}
                        </span>
                    </div>
                </h2>
                <div className="flex items-center justify-center">
                    <div className="flex justify-center items-center w-32 h-32">
                        <div className="text-9xl">
                            {weatherIcons[weatherData.current.condition.text.toLowerCase()]}
                        </div>
                    </div>
                </div>
                <div className="text-xl pt-4 pb-4">
                    <div className="flex justify-between items-center">
                        <div className="space-y-4">
                            <span className="flex space-x-2 items-center">
                                <svg height="24" width="24" viewBox="0 0 32 32" className="fill-current">
                                    <path d="M13,30a5.0057,5.0057,0,0,1-5-5h2a3,3,0,1,0,3-3H4V20h9a5,5,0,0,1,0,10Z"></path>
                                    <path d="M25 25a5.0057 5.0057 0 01-5-5h2a3 3 0 103-3H2V15H25a5 5 0 010 10zM21 12H6V10H21a3 3 0 10-3-3H16a5 5 0 115 5z"></path>
                                </svg>
                                <span>{weatherData.current.wind_kph} km/h</span>
                            </span>
                            <span className="flex space-x-2 items-center">
                                <svg height="24" width="24" viewBox="0 0 32 32" className="fill-current">
                                    <path d="M16,24V22a3.2965,3.2965,0,0,0,3-3h2A5.2668,5.2668,0,0,1,16,24Z"></path>
                                    <path d="M16,28a9.0114,9.0114,0,0,1-9-9,9.9843,9.9843,0,0,1,1.4941-4.9554L15.1528,3.4367a1.04,1.04,0,0,1,1.6944,0l6.6289,10.5564A10.0633,10.0633,0,0,1,25,19,9.0114,9.0114,0,0,1,16,28ZM16,5.8483l-5.7817,9.2079A7.9771,7.9771,0,0,0,9,19a7,7,0,0,0,14,0,8.0615,8.0615,0,0,0-1.248-3.9953Z"></path>
                                </svg>
                                <span>{weatherData.current.humidity}%</span>
                            </span>
                        </div>
                        <div>
                            <h1 className="text-7xl">{weatherData.current.temp_c}°</h1>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center mt-4 flex-col lg:flex-row lg:items-center space-x-4">
                    {weatherData.forecast.forecastday.map((day, index) => {
                        const dateObj = new Date(day.date);
                        const dayOfWeek = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
                        const weatherIcon = weatherIcons[day.day.condition.text.toLowerCase()] || <span><FaCloud /></span>;

                        return (
                            <div key={index} className="flex items-center 2xl:space-x-2 mb-2 md:mb-0 ">
                                <div className="2xl:text-4xl xl:text-3x1 text-white">
                                    {weatherIcon}
                                </div>
                                <div>
                                    <div className="2xl:text-2xl xl:text-2x1 text-white">
                                        {day.day.avgtemp_c}°C
                                    </div>
                                    <div className="2xl:text-2xl xl:text-1 text-white">
                                        {dayOfWeek}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;
