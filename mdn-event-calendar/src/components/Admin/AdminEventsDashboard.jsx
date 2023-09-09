import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";



const AdminEventsDashboard = () => {
    const { allEvents, setAllEventsData } = useData();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredEvents, setFilteredEvents] = useState([]);

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

    const handleDeleteEvent = (eventId) => {
        console.log(eventId);
    };
    return (
        <>
            <h1>Events</h1>
            <input
                type="text"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul>
                {filteredEvents.map((event) => {
                    if (event) {
                        return (
                            <li key={event?.creatorId}>
                                {event.title}
                                {console.log(event)}
                                <button onClick={() => handleDeleteEvent(event.id)}>
                                    Delete
                                </button>
                            </li>
                        );
                    }
                    return null; 
                })}
            </ul>
        </>
    )
};

export default AdminEventsDashboard;