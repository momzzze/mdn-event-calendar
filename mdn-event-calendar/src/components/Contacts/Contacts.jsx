import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/AuthContext";
import { acceptContactRequest, createContactList, rejectContactRequest, sendContactRequest } from "../../services/contacts.service";
import { useData } from "../../contexts/DataContext";
import { FaUser } from "react-icons/fa";
import { getUserContacts } from "../../services/user.service";

const Contacts = () => {

    const { users, contactLists, pendingInvites, setPendingInvites, userContacts, setUserContacts, sendingInvites, setSendingInvites } = useData();
    const [isAddingList, setIsAddingList] = useState(false);
    const [newListName, setNewListName] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showInvites, setShowInvites] = useState(false);
    const { register, reset, handleSubmit } = useForm();
    const { userData } = useAuth();

    useEffect(() => {
        if (pendingInvites?.length > 0) {
            setShowInvites(true);
        } else {
            setShowInvites(false);
        }
    }, [pendingInvites]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleAddListClick = () => {
        setIsAddingList(!isAddingList);
    };
    const handleAddListSubmit = async (data) => {
        const createdList = await createContactList(data?.listName, userData?.uid);
        setIsAddingList(false);
        setNewListName('');
        reset();
    };

    const filteredUsers = users
        ? users.filter((user) =>
            user?.username?.toLowerCase().includes(searchTerm.toLowerCase()) &&
            user.uid !== userData?.uid &&
            !Object.values(userContacts).includes(user.uid)
        )
        : [];

    const handleAddContactClick = async (receiverId) => {
        const success = await sendContactRequest(userData.uid, receiverId);
    };
    const acceptInvite = async (invite) => {
        try {
            await acceptContactRequest(invite.id, userData.uid, invite.sender);
            const updatedUserContacts = await getUserContacts(userData?.uid);
            setUserContacts(updatedUserContacts);

            const updatedPendingInvites = pendingInvites.filter(item => item.uid !== invite.id);
            setPendingInvites(updatedPendingInvites);
        } catch (error) {
            console.error('Error accepting invite:', error);
        }
    }
    const rejectInvite = async (invite) => {
        try {
            const success = await rejectContactRequest(invite.id);
            if (success) {
                const updatedPendingInvites = pendingInvites.filter(item => item.uid !== invite.id);
                setPendingInvites(updatedPendingInvites);
            }
        } catch (error) {
            console.error('Error rejecting invite:', error);
        }
    }


    return (
        <div className="flex h-screen bg-gray-100  border-2 ">
            <div className="w-2/3 bg-white p-4 shadow-md">
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full px-3 py-2 mb-4 border rounded"
                />
                <h2 className="text-xl font-semibold mb-2">Users</h2>
                <div className="grid place-items-center w-70% max-h-96 overflow-y-auto border-2 bg-gray-100">
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
                                    className={`px-4 py-2 bg-purple-800 text-white rounded ${sendingInvites.some(invite => invite.receiver === user.uid && invite.status === 'pending')
                                        ? 'bg-gray-300 cursor-not-allowed'
                                        : 'hover:bg-purple-300'
                                        }`}
                                    disabled={sendingInvites.some(invite => invite.receiver === user.uid && invite.status === 'pending')}
                                >
                                    {sendingInvites.some(invite => invite.receiver === user.uid && invite.status === 'pending')
                                        ? 'Pending'
                                        : 'Add to Contacts'}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="w-1/3 bg-white p-4 shadow-md bg-purple-50">
                <h3 className="text-lg font-semibold mb-2">Your Contact Lists</h3>
                <ul className="space-y-2 mb-6 mt-6">
                    {contactLists && contactLists.map(contactList => (
                        <li key={contactList.id}>
                            <button
                                className="w-full text-left w-3/4 px-4 py-2 text-purple-800  bg-purple-200 hover:bg-purple-800 hover:text-purple-200 rounded-full flex items-center justify-center"
                            >
                                {contactList.name}
                            </button>
                        </li>
                    ))}
                    <button
                        className="inline-block rounded px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-purple-800 hover:text-purple-300 focus:text-purple-300"
                        onClick={handleAddListClick}
                    >
                        Add List
                    </button>
                    <div className="flex justify-center">
                        {isAddingList && (
                            <form onSubmit={handleSubmit(handleAddListSubmit)}>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        placeholder="New List Name"
                                        {...register("listName", { required: true })}
                                        className="w-96 px-4 py-2 border rounded"
                                    />
                                    <button
                                        type="submit"
                                        className="inline-block rounded px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-purple-800 hover:text-purple-300 focus:text-purple-300"
                                    >
                                        Create
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </ul>
                <div className="flex flex-col">
                    {showInvites && (
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Pending Invites</h3>
                            {pendingInvites.map(invite => {
                                const senderUser = users.find(user => user.uid === invite.sender);

                                return (
                                    <div key={invite.id} className="flex items-center justify-between bg-gray-200 p-2 rounded mb-2">
                                        <div className="flex items-center space-x-2">
                                            {senderUser.photo ? (
                                                <img src={senderUser.photo} alt={`${senderUser?.username} Avatar`} className="w-10 h-10 rounded-full mr-10" />
                                            ) : (
                                                <div className="w-10 h-10 bg-purple-800 rounded-full mr-10 flex items-center justify-center">
                                                    <FaUser size={20} color="white" />
                                                </div>
                                            )}
                                            <span className="text-lg font-semibold">{senderUser ? senderUser.username : 'Unknown User'}</span>
                                        </div>
                                        <div>
                                            <button className="text-green-500 mr-2" onClick={() => acceptInvite(invite)}>Accept</button>
                                            <button className="text-red-500" onClick={() => rejectInvite(invite)}>Reject</button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    {userContacts && (
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Your Contacts</h3>
                            {Object.values(userContacts).map((contactId) => {
                                const contactData = users.find((user) => user.uid === contactId);
                                if (contactData) {
                                    return (
                                        <div key={contactId} className="flex items-center justify-between bg-gray-200 p-2 rounded mb-2">
                                            <div className="flex items-center space-x-2">
                                                <img src={contactData.photo} alt={`${contactData.username} Avatar`} className="w-10 h-10 rounded-full mr-10" />
                                                <span className="text-lg font-semibold">{contactData.username}</span>
                                            </div>
                                        </div>
                                    );
                                } else {
                                    return null;
                                }
                            })}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default Contacts;