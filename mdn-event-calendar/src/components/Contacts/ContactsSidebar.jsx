import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { getSendingInvitesFromUser, sendContactRequest } from "../../services/contacts.service";
import { useAuth } from "../../contexts/AuthContext";
import { useData } from "../../contexts/DataContext";

const ContactsSidebar = () => {
    const { userData } = useAuth();
    const { users,userContacts, setSendingInvitesData,setPendingInvitesData,pendingInvites } = useData();
    const [searchTerm, setSearchTerm] = useState("");
    const [sendingInvites, setSendingInvites] = useState([]);

    useEffect(() => {
        const fetchSendingInvites = async () => {
            try {
                if (userData?.uid) {
                    const invitesData = await getSendingInvitesFromUser(userData.uid);
                    setSendingInvites(invitesData);
                }
            } catch (error) {
                console.error('Error fetching sending invites:', error);
            }
        };

        fetchSendingInvites();
    }, [userData,pendingInvites]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleAddContactClick = async (receiverId) => {
        const success = await sendContactRequest(userData.uid, receiverId);
        if (success) {
            setSendingInvites(prevInvites => [
                ...prevInvites,
                { sender: userData.uid, receiver: receiverId, status: 'pending' }
            ]);
            setSendingInvitesData();
            setPendingInvitesData();
        }
    };

    const filteredUsers = users
  ? users.filter((user) =>
      user?.username?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      userData &&
      user.uid !== userData?.uid 
      && (!userContacts || !userContacts.includes(user.uid))
    )
  : [];
    return (
        <div className="w-2/3 bg-white p-4 shadow-md">
            <input
                type="text"
                placeholder="Search users...🔍"
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full px-3 py-2 mb-4 border rounded bg-gray-100"
                
            />
            <h2 className="text-xl font-semibold mb-2 text-purple-800">Users</h2>
            <div className="grid place-items-center w-70% max-h-96 overflow-y-auto border-2 bg-gray-100 text-purple-800">
                <ul className="w-3/4 ">
                    {filteredUsers?.map(user => (
                        <li key={user.id} className="bg-white rounded-lg p-4 flex bg-purple-50 items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                                {user.photo ? (
                                    <img src={user.photo} alt={`${user?.username} Avatar`} className="w-10 h-10 rounded-full mr-10" />
                                ) : (
                                    <div className="w-10 h-10 bg-purple-800 rounded-full mr-10 flex items-center justify-center">
                                        <FaUser size={20} color="white" />
                                    </div>
                                )}
                                <span className="text-lg font-semibold">{user.firstName} {user.lastName}</span>
                            </div>
                            <button
                                onClick={() => handleAddContactClick(user.uid)}
                                className={`px-4 py-2 bg-purple-800 text-white rounded ${sendingInvites && sendingInvites.some(
                                    invite => invite.receiver === user.uid && invite.status === 'pending'
                                )
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'hover:bg-purple-300'
                                    }`}
                                disabled={
                                    sendingInvites &&
                                    sendingInvites.some(
                                        invite => invite.receiver === user.uid && invite.status === 'pending'
                                    )
                                }
                            >
                                {sendingInvites && sendingInvites.some(
                                    invite => invite.receiver === user.uid && invite.status === 'pending'
                                )
                                    ? 'Pending'
                                    : 'Add to Contacts'}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ContactsSidebar;

