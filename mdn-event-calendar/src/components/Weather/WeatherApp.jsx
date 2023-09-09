import { useEffect, useState } from 'react';
import { fetchWeatherData } from '../../services/weather.service';
import { FaSun, FaCloud, FaCloudSun, FaCloudMoon, FaCloudRain, FaCloudShowersHeavy } from 'react-icons/fa';
import { IoMdSunny } from 'react-icons/io';

const WeatherApp = ({ city }) => {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        async function getWeather() {
            try {
                const data = await fetchWeatherData(city);
                setWeatherData(data);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        getWeather();
    }, [city]);

    const weatherIcons = {
        'sunny': <FaSun />,
        'partly cloudy': <FaCloudSun />,
        'clear': <FaSun />,
        'overcast': <FaCloud />,
        'cloudy': <FaCloud />,
        'rain': <FaCloudRain />,
        'showers': <FaCloudShowersHeavy />,
        'light rain': <FaCloudRain />,
        'light showers': <FaCloudShowersHeavy />,
    };

    return (
        <div className="bg-gray-200  py-8 ml-5 mr-5 mb-16 ">
            <div className="max-w-screen-lg bg-white mx-auto p-8  ml-5 mr-5">
                {weatherData && (
                    <div >
                        <div className="flex flex-col lg:flex-row lg:items-center bg-purple-800 rounded-full">
                            <div className="lg:w-1/2">
                                <h2 className="text-2xl font-semibold mb-2 text-white">
                                    Weather in {weatherData.location.name}
                                </h2>
                                <p className="text-lg text-white">
                                    Temperature: {weatherData.current.temp_c}°C
                                </p>
                            </div>
                            <div className="lg:w-1/2 flex justify-center items-center">
                                <div className="text-8xl text-white">
                                    {weatherIcons[weatherData.current.condition.text.toLowerCase()]}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center mt-4 flex-col lg:flex-row lg:items-center space-x-6">
                            {weatherData.forecast.forecastday.map((day, index) => {
                                const dateObj = new Date(day.date);
                                const dayOfWeek = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
                                const weatherIcon = weatherIcons[day.day.condition.text.toLowerCase()] || <span><FaCloud /></span>;

                                return (
                                    <div key={index} className="flex items-center space-x-2 mb-2 md:mb-0">
                                        <div className="text-2xl text-purple-800">
                                            {weatherIcon}
                                        </div>
                                        <div>
                                            <div className="text-lg text-purple-800">
                                                {day.day.avgtemp_c}°C
                                            </div>
                                            <div className="text-sm text-purple-800">
                                                {dayOfWeek}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WeatherApp;
