import './EventCard.css';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsernameForCreator } from "../../../services/user.service";

const EventCard = ({ eventId, eventData, username }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [creatorData, setCreatorData] = useState(null);

    const navigate = useNavigate();
    const startDate = new Date(eventData.startDate);
    const dayOfMonth = startDate.getDate();
    const endDate = new Date(eventData.endDate);
    const formattedStartDate = startDate.toLocaleString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    }) + " - " + endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const formattedMonth = startDate.toLocaleString('default', { month: 'short' });

    const fetchCreatorData = async () => {
        try {
            const creatorName = await getUsernameForCreator(username);
            setCreatorData(creatorName);
        } catch (error) {
            console.error('Error fetching creator data:', error);
        }
    };
    const handleCardClick = () => {
        navigate(`/event/${eventData?.id}`,
            {
                state: {
                    eventDataId: eventData.id,
                    username: username
                }
            });
    };
    useEffect(() => {
        if (username) {
            fetchCreatorData();
        }
    }, []);

    return (
        <div
            className={`flex h-44 bg-purple-800 cursor-pointer border transform transition duration-300 hover:bg-purple-400 hover:scale-105 hover:rounded-xl hover:border-none`}
            onClick={handleCardClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <div className="w-1/3 flex items-center justify-center">
                <div className="text-center tracking-wide">
                    <div className="text-white font-bold text-4xl">{dayOfMonth}</div>
                    <div className="text-white font-normal text-2xl">{formattedMonth}</div>
                </div>
            </div>
            <div className="w-2/3 bg-white ">
                <div className="flex flex-col justify-between lg:justify-start">
                    <div className="text-gray-700 font-medium text-sm text-center lg:text-left px-2 flex flex-row justify-center lg:justify-start">
                        <div className="flex items-center">
                            <i className="far fa-clock"></i> {formattedStartDate}
                        </div>
                        <div className="flex items-center ml-4">
                            Organiser: {creatorData}
                        </div>
                    </div>
                    <div className="font-semibold text-gray-800 text-xl text-center lg:text-left px-2 ">
                        {eventData.title}
                    </div>
                    <div className="text-gray-600 font-medium text-sm pt-1 text-center lg:text-left px-2 mt-3">
                        {eventData.location}
                    </div>
                </div>
            </div>
            <div className="h-full w-2/12 flex justify-center items-center bg-white hover:border-none">
                <span className="tracking-wider text-gray-600 bg-gray-200 px-2 text-sm rounded leading-loose mx-2 font-semibold">
                    {eventData.publicity}
                </span>
            </div>
        </div>
    );
};

export default EventCard;
