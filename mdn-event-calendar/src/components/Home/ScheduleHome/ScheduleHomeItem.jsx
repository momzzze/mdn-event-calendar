import dayjs from "dayjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../../contexts/DataContext";

const ScheduleHomeItem = ({ event }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { users } = useData();
  const startDay = dayjs(event?.startDate).format("D");
  const startDayName = dayjs(event?.startDate).format("ddd");
  const startDate = dayjs(event?.startDate).format("MMM D, HH:mm");
  const endDate = dayjs(event?.endDate).format("MMM D, HH:mm");

  const handleCardClick = () => {
    navigate(`/event/${event?.id}`, {
      state: {
        eventDataId: event?.id,
        username: event?.username,
      },
    });
  };

  const user = users?.find((user) => user?.uid === event?.creatorId);

  return (
    <li
      className={`flex items-center px-4 py-6 space-x-6 group border-2 bg-white rounded-xl text-white
      ${isHovered ? "scale-105 cursor-pointer" : ""}`}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ backgroundColor: event?.color }}
    >
      <div className="px-3 font-semibold border-r-2 self-start">
        <time dateTime={event?.startDate} className="text-xl self-start">
          {startDayName}
        </time>
        <br />
        <time dateTime={event?.startDate} className="text-3xl">
          {startDay}
        </time>
      </div>
      <div className="flex-1 self-start">
        <p className="text-3xl font-bold">{event.title}</p>
        <p className="mt-0.5">
          <span className="mt-0.5 mr-3 font-bold">Start</span>
          <time dateTime={event?.startDate}>{startDate}</time>
          <span className="mr-2"> | </span>
          <span className="mt-0.5 mr-3 font-bold">End</span>
          <time dateTime={event.endDate}>{endDate}</time>
          <span className="mr-2"> | </span>
          <span className="mt-0.5 mr-2 font-bold">{event?.publicity}</span>
          <span className="mr-2"> | </span>
          <span className="mt-0.5 mr-4 font-bold">{user?.id}</span>
        </p>
        <p>{event?.description.slice(0, 150)}...</p>
      </div>
      <div className="flex items-center">
        <img
          src={
            event?.imageUrl
              ? event?.imageUrl
              : "https://png.pngtree.com/png-clipart/20190916/original/pngtree-flat-calendar-png-image_4590004.jpg"
          }
          alt="event image"
          className="object-cover flex-none w-32 h-24 rounded-md"
        />
      </div>
    </li>
  );
};

export default ScheduleHomeItem;
