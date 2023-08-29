import { useNavigate } from 'react-router-dom';

const EventListItem = ({ event }) => {
    const navigate = useNavigate();

    return (
        <div
            className=""
            onClick={() => navigate(`/events/${event.id}`)}
        >
            <div className="flex justify-between">
                <h1 className="text-lg font-semibold">{event.title}</h1>
                <h1 className="text-lg font-semibold">{event.user}</h1>
            </div>
            <div className="flex justify-between">
                <p className="text-gray-400">{event.date}</p>
                <p className="text-gray-400">{event.time}</p>
            </div>
        </div>
    );
};

export default EventListItem;