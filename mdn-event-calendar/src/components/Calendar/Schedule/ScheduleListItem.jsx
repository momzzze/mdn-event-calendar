import dayjs from "dayjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ScheduleListItem = ({ event, selectDate }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const startDate = dayjs(event?.startDate).format("MMM D, h:mm A");
  const endDate = dayjs(event?.endDate).format("MMM D, h:mm A");

  const handleCardClick = () => {
    navigate(`/event/${event?.id}`,
    {
        state: {
            eventDataId: event.id,
            username: event?.username
        }
    });
};

  return (
    <li
      className={`flex items-center px-4 py-2 space-x-4 group border-2 bg-white rounded-xl
      ${isHovered ? "scale-105 cursor-pointer" : ""}`}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col items-center">
        <img
          src={event.imageUrl}
          alt="event image"
          className="object-cover flex-none w-12 h-12 rounded-full"
        />
        <p className="mt-0.5 text-gray-500">{event?.publicity}</p>
      </div>
      <div className="flex-auto">
        <p className="text-lg text-gray-900 font-bold">{event.title}</p>
        <p className="mt-0.5">
          <span className="mt-0.5 mr-3 font-bold">Start</span>
          <time dateTime={event?.startDate}>{startDate}</time>
        </p>
        <p className="mt-0.5">
          <span className="mt-0.5 mr-4 font-bold">End</span>
          <time dateTime={event.endDate}>{endDate}</time>
        </p>
      </div>
    </li>
  );
};

export default ScheduleListItem;
