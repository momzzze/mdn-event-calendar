import './ListEvents.css';
import { useEffect, useState } from "react";
import { getEventsCreatedByUser, getPrivateEvents, getPublicEvents } from "../../../services/event.service";
import EventCard from "../EventCard/EventCard";
import { useAuth } from "../../../contexts/AuthContext";

const ListEvents = () => {
    const { userData } = useAuth();
    const [events, setEvents] = useState([]);
    const [publicEvents, setPublicEvents] = useState([]);
    const [privateEvents, setPrivateEvents] = useState([]);
    const [activeTab, setActiveTab] = useState("myEvents");


    useEffect(() => {
        const fetchEvents = async () => {
            if (userData?.uid) {
                const userEvents = await getEventsCreatedByUser(userData?.username, userData?.uid);
                setEvents(userEvents);
            }
        };
        if (userData?.uid) {
            fetchEvents();
        }
    }, [userData]);

    useEffect(() => {
        const fetchPublicEvents = async () => {
            const publicEvents = await getPublicEvents();
            setPublicEvents(publicEvents);
        }
        fetchPublicEvents();
    }, []);

    useEffect(() => {
        const fetchPrivateEvents = async () => {
            const privateEvents = await getPrivateEvents(userData?.uid);
            setPrivateEvents(privateEvents);
        }
        fetchPrivateEvents();
    }, [userData]);

    const renderTabContent = () => {
        const currentDate = new Date();

        if (activeTab === "myEvents") {
            {console.log(events)}
            return events
                .filter((event) => new Date(event?.endDate) >= currentDate)
                .map((event) => (
                    <div key={event.id} className="w-full p-4">                        
                        <EventCard eventData={event} username={event?.creatorId} />
                    </div>
                ));
        }
        if (activeTab === "public") {
            return publicEvents
                .filter((event) => new Date(event.endDate) >= currentDate)
                .map((event) => (
                    <div key={event.id} className="w-full p-4 ">
                        <EventCard eventId={event.id} eventData={event} username={event?.creatorId} />
                    </div>
                ));
        }
        if (activeTab === "private") {
            return privateEvents
                .filter((event) => new Date(event.endDate) >= currentDate)
                .map((event) => (
                    <div key={event.id} className="w-full p-4">
                        <EventCard eventData={event} username={event?.creatorId} />
                    </div>
                ));
        }
    };

    return (
        <div className="w-full mt-10 flex flex-col items-center ">
            <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                <li className="mr-2">
                    <button
                        className={`inline-block px-4 py-3 ${activeTab === "myEvents" ? "text-white bg-purple-800" : "hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
                            } rounded-lg`}
                        onClick={() => setActiveTab("myEvents")}
                    >
                        My events
                    </button>
                </li>
                <li className="mr-2">
                    <button
                        className={`inline-block px-4 py-3 rounded-lg ${activeTab === "public" ? "text-white bg-purple-800" : "text-purple-800 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
                            } rounded-lg`}
                        onClick={() => setActiveTab("public")}
                    >
                        Public
                    </button>
                </li>
                <li className="mr-2">
                    <button
                        className={`inline-block px-4 py-3 rounded-lg ${activeTab === "private" ? "text-white bg-purple-800" : "text-purple-800 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
                            } rounded-lg`}
                        onClick={() => setActiveTab("private")}
                    >
                        Private
                    </button>
                </li>
            </ul>
            <div className='w-full mt-3'>
                <div className={`tab-content   ${activeTab === "myEvents" ? "active" : ""} mb-[5rem]`}>
                    <div className="bg-white mx-auto w-10/12 shadow-xl rounded-lg border mt-2 mb-[5rem]">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
                            {renderTabContent("myEvents")}
                        </div>
                    </div>
                </div>
                <div className={`tab-content ${activeTab === "public" ? "active" : ""} mb-[5rem]`}>
                    <div className="bg-white  mx-auto w-10/12 shadow-xl rounded-lg border mt-2 mb-[5rem]">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
                            {renderTabContent("public")}
                        </div>
                    </div>
                </div>
                <div className={`tab-content ${activeTab === "private" ? "active" : ""} mb-[5rem]`}>
                    <div className="bg-white  mx-auto w-10/12 shadow-xl rounded-lg border mt-2 mb-[5rem]">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
                            {renderTabContent("private")}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListEvents;
