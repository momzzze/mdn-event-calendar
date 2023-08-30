import { useLocation } from "react-router-dom";
import { FaEdit, FaTrash, FaUsers, FaMapMarkerAlt, FaLock, FaUser } from 'react-icons/fa';
import ParticipantsSection from "./ParticipantsSection";
import { useAuth } from "../../../contexts/AuthContext";

const SingleComponent = () => {
    const location = useLocation();
    const { userData } = useAuth();
    const { eventData, username } = location.state || {};
    const startDate = new Date(eventData?.startDate);
    const endDate = new Date(eventData?.endDate);
    const month = startDate.toLocaleString('en-US', { month: 'short' });
    const day = startDate.getDate();
    const startHour = startDate.toLocaleString('en-US', { hour: 'numeric', hour12: true });
    const endHour = endDate.toLocaleString('en-US', { hour: 'numeric', hour12: true });

    const deleteHandler = () => {
        console.log("Delete");
    }
    const editHandler = () => {
        console.log("Edit");
    }
    
    const joinToEventHandler=()=>{
        console.log("Join");
    }

    return (
        <div className="mx-auto h-10/12 flex flex-col items-center justify-center px-8 mt-10">
            <div className="flex flex-col w-full bg-white rounded shadow-lg sm:w-3/4 md:w-1/2 lg:w-3/5">
                <div className="w-full h-64 bg-top rounded-t overflow-hidden">
                    <img
                        src={eventData?.imageUrl}
                        alt="event image"
                        className="object-cover h-full w-full transition-transform duration-300 transform hover:scale-105"
                    />
                </div>
                <div className="flex flex-col w-full md:flex-row">
                    <div className="flex flex-row justify-around p-4 font-bold leading-none text-white uppercase bg-purple-800 rounded md:flex-col md:items-center md:justify-center md:w-1/4 transition-transform duration-300 transform hover:scale-105">
                        <div className="md:text-3xl">{month}</div>
                        <div className="md:text-6xl">{day}</div>
                        <div className="md:text-xl">{startHour}</div>
                    </div>
                    <div className="p-4 font-normal md:w-3/4">
                        <h1 className="mb-4 text-4xl font-bold leading-none tracking-tight text-gray-800">{eventData?.title}</h1>
                        <p className="leading-normal">{eventData?.description}</p>
                        <div className="w-full flex justify-between mb-3 mt-3">
                            <div className="flex items-center ml-6">
                                <FaLock className='mr-6' /> {eventData?.publicity}
                            </div>
                            <div className="flex items-center ml-6">
                                <FaMapMarkerAlt className="mr-2" />{eventData?.location}
                            </div>
                        </div>
                        <div className="w-full flex justify-between mb-3 mt-3">
                            <div className="flex items-center ml-6">
                               <FaUser className="mr-4"/> {username}
                            </div>
                            <div className="flex items-center mr-6">
                                <FaUsers className="mr-2" />
                                {eventData?.participants.length}
                            </div>
                        </div>
                        <div className="flex flex-row items-center mt-4 text-gray-700">
                            <div className="flex w-5/6 flex-row items-center mt-4 text-gray-700">
                                <div className="w-50% mr-6">
                                    Start Date: {month} {day}, {startHour}
                                </div>
                                <div className="w-50%">
                                    End Date: {endDate.toLocaleString('en-US', { month: 'short', day: 'numeric' })}, {endDate.toLocaleString('en-US', { hour: 'numeric', hour12: true })}
                                </div>
                            </div>
                            {!eventData.participants.includes(userData?.uid) && <button onClick={joinToEventHandler} className="w-2/12 bg-purple-800 text-white rounded-lg p-2">Join</button>}


                            {(eventData?.creatorId === userData?.uid) && (<div className="w-2/12 flex justify-end">
                                <button className="mr-3" onClick={editHandler}>
                                    <FaEdit />
                                </button>
                                <button className="mr-3" onClick={deleteHandler}>
                                    <FaTrash />
                                </button>
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>
            {(eventData?.creatorId === userData?.uid) && <ParticipantsSection />}
        </div>
    );
};

export default SingleComponent;
