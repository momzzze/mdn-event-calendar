import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { useNavigate } from "react-router-dom";
import { deleteEvent } from "../../services/event.service";



const AdminEventsDashboard = () => {
    const { allEvents, setAllEventsData, setPublicEventsCurrentUserParticipateData, setPrivateEventsData } = useData();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [eventToDelete, setEventToDelete] = useState(null);

    const [itemsPerPage] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        setAllEventsData();
    }, [])

    useEffect(() => {
        if (allEvents) {
            const eventsArray = Object.values(allEvents);
            const filtered = eventsArray.filter((event) =>
                event.title.toLowerCase().includes(searchTerm.toLowerCase())
            );

            setFilteredEvents(filtered);
        }
    }, [allEvents, searchTerm]);

    const formatDate = (timestamp) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(timestamp).toLocaleDateString(undefined, options);
    };

    const handleViewEvent = (event) => {
        navigate(`/event/${event.id}`, {
            state: {
                eventDataId: event.id,
                username: event.creatorId
            }
        });
    }
    // delete logic;
    const openConfirmationModal = (eventId, creatorId) => {
        setEventToDelete({ eventId, creatorId });
        setShowConfirmationModal(true);
    };

    const confirmDelete = async () => {
        if (eventToDelete) {
            const { eventId, creatorId } = eventToDelete;
            const deleted = await deleteEvent(eventId, creatorId);
            setPublicEventsCurrentUserParticipateData();
            setPrivateEventsData();
            if (deleted) {
                setAllEventsData();
                setShowConfirmationModal(false);
            } else {
                console.error("Failed to delete event.");
            }
        }
    };

    const cancelDelete = () => {
        setShowConfirmationModal(false);
    };


    const handleDeleteEvent = async (eventId, creatorId) => {
        openConfirmationModal(eventId, creatorId);
    };

    const maxPageButtons = 5;
    const pageCount = Math.ceil(filteredEvents.length / itemsPerPage);

    const indexOfLastEvent = currentPage * itemsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
    const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const goToFirstPage = () => {
        setCurrentPage(1);
    };

    const goToLastPage = () => {
        setCurrentPage(pageCount);
    };

    return (
        <div className="p-4">
            <div className="bg-purple-800 text-white py-2 px-4 rounded-md mb-4">
                <h1 className="text-3xl font-semibold">Events</h1>
            </div>
            <input
                type="text"
                placeholder="Search by title...🔍"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border rounded-md mb-4"
            />
            <ul className="border-t border-gray-300 divide-y divide-gray-300">
                {currentEvents.map((event) => {
                    if (event) {
                        return (
                            <li
                                key={event?.id}
                                className="bg-white p-4 shadow-md flex flex-col md:flex-row justify-between items-center"
                            >
                                <div className="flex flex-col items-start mb-2 md:mb-0">
                                    <h2 className="text-lg font-semibold text-purple-800">
                                        {event.title}
                                    </h2>
                                    <p className="text-gray-600">
                                        Date: {formatDate(event.startDate)}
                                    </p>
                                </div>
                                <div className="space-y-2 md:space-y-0 md:space-x-2 md:flex md:flex-row gap-2">
                                    <button
                                        onClick={() => handleViewEvent(event)}
                                        className="bg-purple-800 hover:bg-purple-400 text-white py-2 px-4 rounded-md"
                                    >
                                        View
                                    </button>
                                    <button
                                        onClick={() => handleDeleteEvent(event.id, event.creatorId)}
                                        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                    {showConfirmationModal && (
                                        <div className="fixed inset-0 flex items-center justify-center z-50">
                                            <div className="bg-black opacity-10"></div>
                                            <div className="z-10 bg-white p-4 rounded-md shadow-lg">
                                                <p className="text-xl font-bold mb-4">Are you sure you want to delete this event?</p>
                                                <div className="flex justify-end">
                                                    <button
                                                        className="px-4 py-2 bg-red-500 text-white rounded-md mr-2"
                                                        onClick={confirmDelete}
                                                    >
                                                        OK
                                                    </button>
                                                    <button
                                                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                                                        onClick={cancelDelete}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </li>
                        );
                    }
                    return null;
                })}
            </ul>
            <div className="mt-4 flex justify-center">
                <ul className="flex">
                    {currentPage > 1 && (
                        <li>
                            <button
                                onClick={goToFirstPage}
                                className="mx-2 px-3 py-2 rounded-md bg-purple-800 text-white"
                            >
                                First
                            </button>
                        </li>
                    )}
                    {Array.from({ length: Math.min(maxPageButtons, pageCount) }).map((_, index) => (
                        <li key={index}>
                            <button
                                onClick={() => paginate(index + 1)}
                                className={`mx-2 px-3 py-2 rounded-md ${currentPage === index + 1 ? "bg-purple-800 text-white" : "bg-gray-300"
                                    }`}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}
                    {currentPage < pageCount && (
                        <li>
                            <button
                                onClick={goToLastPage}
                                className="mx-2 px-3 py-2 rounded-md bg-purple-800 text-white"
                            >
                                Last
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
};

export default AdminEventsDashboard;