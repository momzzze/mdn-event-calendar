import { useLocation, useNavigate, } from "react-router-dom";
import { FaEdit, FaTrash, FaUsers, FaMapMarkerAlt, FaLock, FaUser } from 'react-icons/fa';
import ParticipantsSection from "./ParticipantsSection";
import { useAuth } from "../../../contexts/AuthContext";
import { useData } from "../../../contexts/DataContext";
import { useEffect, useState } from "react";
import { addParticipantToEvent, deleteEvent, fetchParticipants, getEventById, removeParticipantFromEvent } from "../../../services/event.service";
import EditEvent from "../EditEvent/EditEvent";
import Map from "../../Map/Map";


const SingleComponent = () => {
    const location = useLocation();
    const { userData } = useAuth();
    const { users, setPublicEventsData, setPublicEventsCurrentUserParticipateData, setPrivateEventsData } = useData();
    const { eventDataId } = location.state || {};
    const [eventData, setEventData] = useState({});
    const [participants, setParticipants] = useState([]);
    const redirect = useNavigate();
    const [isOpenEditEventModal, setOpenEditEventModal] = useState(false);



    const startDate = new Date(eventData?.startDate);
    const endDate = new Date(eventData?.endDate);
    const timeZoneOption = { timeZone: 'Europe/Istanbul' };
    const month = startDate.toLocaleString('en-US', { month: 'short', ...timeZoneOption });
    const day = startDate.toLocaleString('en-US', { day: 'numeric', ...timeZoneOption });
    const startHour = startDate.toLocaleString('en-US', { hour: 'numeric', hour12: true, ...timeZoneOption });
    // const endHour = endDate.toLocaleString('en-US', { hour: 'numeric', hour12: true, ...timeZoneOption });

    useEffect(() => {
        if (location.state && location.state.eventDataId) {
            const eventId = location.state.eventDataId;
            getEventData(eventId);
            getParticipants(eventId);
        }
    }, [eventDataId]);

    const getParticipants = async (eventId) => {
        const participantsData = await fetchParticipants(eventId);
        setParticipants(participantsData);
    };

    const getEventData = async (eventId) => {
        const event = await getEventById(eventId);
        if (event) {
            setEventData(event);
        } else {
            console.error(`Event with ID (${eventId}) not found.`);
        }
    };

    const refreshEventData = () => {
        if (location.state && location.state.eventDataId) {
            const eventId = location.state.eventDataId;
            getEventData(eventId);
            getParticipants(eventId);
        }
    };


    const openEditEventModal = () => {
        setOpenEditEventModal(true);
    }
    const closeEditEventModal = () => {
        setOpenEditEventModal(false);
    }

    const updateParticipants = (data) => {
        setParticipants(data)
    }

    const deleteHandler = async () => {
        const success = await deleteEvent(eventData.id, eventData.creatorId)
        if (success) {
            redirect('/events');
        }
    }

    const editHandler = () => {
        openEditEventModal();

    }

    const removeParticipantHandle = async (eventId, participantId, publicity) => {
        if (participants.includes(participantId)) {
            const success = await removeParticipantFromEvent(eventId, participantId);
            if (success) {
                const updatedParticipants = participants.filter(id => id !== participantId);
                updateParticipants(updatedParticipants);
                refreshEventData();
                setPublicEventsData();
                setPublicEventsCurrentUserParticipateData();
                setPrivateEventsData();
            }
        }
        if (publicity === 'private' && userData?.uid !== eventData?.creatorId) {
            redirect('/events');
        }
    }
    const addParticipantHandle = async (eventId, participantId) => {
        if (!participants.includes(participantId)) {
            const success = await addParticipantToEvent(eventId, participantId);
            if (success) {
                updateParticipants([...participants, participantId]);
                refreshEventData();
                setPublicEventsData();
                setPublicEventsCurrentUserParticipateData();
                setPrivateEventsData();
            }
        }
    }

    return (
        <div className="mx-auto h-10/12 flex flex-col items-center justify-center px-8 mt-10 mb-16">
            <div className="flex flex-col w-full bg-white rounded shadow-lg sm:w-3/4 md:w-1/2 lg:w-3/5">
                <div className="w-full">
                    <div className="flex flex-row">
                        <div className="w-1/2 h-96 bg-top rounded-t overflow-hidden border-r border-gray-400 text-gray-700">
                            <Map address={eventData?.location || ''} />
                        </div>
                        <div className="w-1/2 h-96 rounded-t ">
                            <img
                                src={eventData?.imageUrl}
                                alt="event image"
                                className="w-full h-full transition-transform duration-300 transform hover:scale-105"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full md:flex-row text-gray-700">
                    <div className="flex flex-row justify-around p-4 font-bold leading-none text-white uppercase bg-purple-800 rounded md:flex-col md:items-center md:justify-center md:w-1/4 transition-transform duration-300 transform hover:scale-105 text-gray-700">
                        <div className="md:text-3xl">{month}</div>
                        <div className="md:text-6xl">{day}</div>
                        <div className="md:text-xl">{startHour}</div>
                    </div>
                    <div className="p-4 font-normal md:w-3/4 text-gray-700">
                        <h1 className="mb-4 text-4xl font-bold leading-none tracking-tight text-gray-800">{eventData?.title}</h1>
                        <p className="leading-normal">{eventData?.description}</p>
                        <div className="w-full flex justify-between mb-3 mt-3 text-gray-700">
                            <div className="flex items-center ml-6 text-gray-700">
                                <FaLock className='mr-6' /> {eventData?.publicity}
                            </div>
                            <div className="flex items-center ml-6 text-gray-700">
                                <FaMapMarkerAlt className="mr-2 text-gray-700" />{eventData?.location}
                            </div>
                        </div>
                        <div className="w-full flex justify-between mb-3 mt-3 text-gray-700">
                            <div className="flex items-center ml-6 text-gray-700">
                                <FaUser className="mr-4" />{users?.find(user => user.uid === eventData?.creatorId)?.username || "Unknown User"}
                            </div>
                            <div className="flex items-center mr-6 text-gray-700">
                                <FaUsers className="mr-2" />
                                {participants.length}
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
                            {userData?.uid !== eventData?.creatorId && (
                                <>
                                    {participants?.includes(userData?.uid) ? (
                                        <button onClick={() => removeParticipantHandle(eventData.id, userData?.uid, eventData.publicity)} className="w-2/12 bg-red-800 text-white rounded-lg p-2">
                                            Leave
                                        </button>
                                    ) : (
                                        <button onClick={() => addParticipantHandle(eventData.id, userData?.uid)} className="w-2/12 bg-purple-800 text-white rounded-lg p-2">
                                            Join
                                        </button>
                                    )}
                                </>
                            )}


                            {(eventData?.creatorId === userData?.uid) && (<div className="w-2/12 flex justify-end text-gray-700">
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
            {(eventData?.creatorId === userData?.uid) && <ParticipantsSection eventData={eventData} eventId={eventData.id} eventParticipants={participants} addParticipantHandle={addParticipantHandle} removeParticipantHandle={removeParticipantHandle} refreshEventData={refreshEventData} />}
            {isOpenEditEventModal && (
                <EditEvent
                    eventData={eventData}
                    isOpen={isOpenEditEventModal}
                    onRequestClose={closeEditEventModal}
                    refreshEventData={refreshEventData}
                />
            )}

        </div>
    );
};

export default SingleComponent;
