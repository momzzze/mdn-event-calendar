import React, { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useData } from '../../../contexts/DataContext';
import { addParticipantToEvent } from '../../../services/event.service';

const ParticipantsSection = ({ eventData, eventParticipants, addParticipantHandle, removeParticipantHandle,refreshEventData }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const { userContacts, users } = useData();
    const [filteredParticipants, setFilteredParticipants] = useState([]);



    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    useEffect(() => {
        const filtered = userContacts?.map((contactId) =>
            users.find((user) => user.uid === contactId)
        );
        setFilteredParticipants(filtered);
    }, [userContacts, users]);

    const filteredResults = filteredParticipants?.filter((participant) =>
        participant.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        participant.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const isParticipant = (user) => {
        return eventParticipants.some((participant) => participant === user.uid);
    };

    return (
        <div className="flex flex-col w-full bg-white rounded shadow-lg sm:w-3/4 md:w-1/2 lg:w-3/5 mt-4 mb-6">
            <h1 className="p-2 bg-purple-800 text-white text-2xl font-semibold rounded-t mb-6">
                Invite Participants</h1>
            <input
                type="search"
                placeholder="Search participants..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-10/12 px-3 py-2 mb-4 text-gray-700 placeholder-gray-500 border rounded mx-auto"
            />
            <div>
                {filteredResults?.map(participant => (
                    <div
                        key={participant.id}
                        className="bg-white rounded-lg p-4 flex bg-purple-50 items-center justify-between mb-4"
                    >

                        <div className="flex items-center space-x-2">
                            {participant.photo ? (
                                <img
                                    src={participant.photo}
                                    alt={`${participant.username} Avatar`}
                                    className="w-10 h-10 rounded-full mr-10"
                                />
                            ) : (
                                <div className="w-10 h-10 bg-purple-800 rounded-full mr-10 flex items-center justify-center">
                                    <FaUser size={20} color="purple" />
                                </div>
                            )}
                            <span className="text-lg font-semibold">
                                {participant.firstName} {participant.lastName}
                            </span>
                        </div>
                        {/* <button
                            onClick={() => addParticipantHandle(eventId, participant.uid)}
                            className={`px-4 py-2 rounded ${isParticipant(participant)
                                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                : 'bg-purple-800 text-white'
                                }`}

                        >
                            {isParticipant(participant) ? 'Attending' : 'Add participant'}
                        </button> */}
                        {eventParticipants?.includes(participant?.uid) ? (
                            <button onClick={() => removeParticipantHandle(eventData.id, participant.uid, eventData.publicity)} className="w-2/12 bg-red-800 text-white rounded-lg p-2">
                                Remove
                            </button>
                        ) : (
                            <button onClick={() => addParticipantHandle(eventData.id, participant.uid)} className="w-2/12 bg-purple-800 text-white rounded-lg p-2">
                                Add participant
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div >
    );
};

export default ParticipantsSection;
