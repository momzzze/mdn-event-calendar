import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/AuthContext";
import { acceptContactRequest, addContactToList, createContactList, deleteContactList, rejectContactRequest, removeContact, sendContactRequest, updateContactList } from "../../services/contacts.service";
import { useData } from "../../contexts/DataContext";
import { FaTimes, FaUser } from "react-icons/fa";
import { getUserContacts } from "../../services/user.service";
import { FaPlus } from "react-icons/fa";

const dummyContactLists = [
    {
        id: 1,
        name: 'Family',
        contacts: [
            { id: 1, name: 'John Doe' },
            { id: 2, name: 'Jane Smith' },
        ],
    },
    {
        id: 2,
        name: 'Friends',
        contacts: [
            { id: 3, name: 'Alex Johnson' },
            { id: 4, name: 'Emily Brown' },
        ],
    },
    // Add more contact lists and contacts as needed
];
const Contacts = () => {

    const { users, contactLists, pendingInvites, setPendingInvites, userContacts, setUserContacts, sendingInvites, setSendingInvites } = useData();
    const [isAddingList, setIsAddingList] = useState(false);
    const [newListName, setNewListName] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showInvites, setShowInvites] = useState(false);
    const [selectedContactList, setSelectedContactList] = useState(null);

    const [activeAccordion, setActiveAccordion] = useState(null);

    const { register, reset, handleSubmit } = useForm();
    const { userData } = useAuth();

    const toggleContactListDropdown = (listId) => {
        setSelectedContactList(listId === selectedContactList ? null : listId);
    };
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

    const handleDeleteContactList = async (listId) => {
        const success = await deleteContactList(listId);
    }
    const removeContactHandle = async (contactId) => {
        const success = await removeContact(userData.uid, contactId)
    }
    const handleAddListSubmit = async (data) => {
        const createdList = await createContactList(data?.listName, userData?.uid);
        setIsAddingList(false);
        setNewListName('');
        reset();
    };
    const toggleAccordion = (index) => {
        if (activeAccordion === index) {
            setActiveAccordion(null);
        } else {
            setActiveAccordion(index);
        }
    };
    const handleAddContact = async (listId, contactId) => {
        const success = await addContactToList(listId, contactId);
        if (success) {
            setSelectedContactList(null);
        }
    };
    const handleRemoveContact = async (listId, contactId) => {
        try {
            const updatedContactList = { ...contactLists.find(list => list.id === listId) };
            delete updatedContactList.contacts[contactId];
            await updateContactList(listId, updatedContactList);
        } catch (error) {
            console.error('Error removing contact:', error);
        }
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
                                    className={`px-4 py-2 bg-purple-800 text-white rounded ${sendingInvites && sendingInvites.some(
                                        invite => invite.receiver === user.uid && invite.status === 'pending'
                                    )
                                            ? 'bg-gray-300 cursor-not-allowed'
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
            <div className="w-1/3 bg-white p-4 shadow-md bg-purple-50">
                <h3 className="text-lg font-semibold mb-2">Your Contact Lists</h3>
                <ul className="space-y-2 mb-6 mt-6">
                    {contactLists && contactLists.map((contactList, index) => (
                        <li key={contactList.id}>
                            <div className="flex items-center justify-between">
                                <button
                                    className="w-full text-left w-3/4 px-4 py-2 text-purple-800 bg-purple-200 hover:bg-purple-800 hover:text-purple-200 rounded-full flex items-center justify-between"
                                    onClick={() => toggleAccordion(index)}
                                >
                                    <span className="mr-2">{contactList.name}</span>
                                    <span className={`transform transition-transform ${activeAccordion === index ? 'rotate-180' : 'rotate-0'}`}>
                                        ▼
                                    </span>
                                </button>
                                <button
                                    className="ml-2 hover:text-purple-300 text-purple-800 rounded-full px-2 py-1"
                                    onClick={() => handleDeleteContactList(contactList.id)}
                                >
                                    <FaTimes />
                                </button>
                            </div>
                            {activeAccordion === index && (
                                <div className="pl-6 mt-2 space-y-2">
                                    {contactList && contactList.contacts && Object.keys(contactList.contacts).map((contactId) => {
                                        const contactData = users.find(user => user.uid === contactId);
                                        return (
                                            <div key={contactId} className="flex justify-between items-center">
                                                <span className="ml-6">{contactData?.username}</span>
                                                <div className="flex space-x-2">
                                                    <button
                                                        className="mr-6 hover:text-purple-300 text-purple-800 rounded-full px-2 py-1"
                                                        onClick={() => handleRemoveContact(contactList.id, contactId)}
                                                    >
                                                        <FaTimes />
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div className="flex ml-6 items-center">
                                        <div className="relative">
                                            <button
                                                onClick={() => toggleContactListDropdown(contactList.id)}
                                                className="p-1 rounded-full focus:outline-none mr-4"
                                            >
                                                <FaPlus className="text-purple-800 hover:text-purple-300" />
                                            </button>
                                            {selectedContactList === contactList.id && (
                                                <div className="absolute right-0 mt-2 bg-white p-2 shadow-md">
                                                    {userContacts && userContacts.map(contactId => {
                                                        const contactData = users.find(user => user.uid === contactId);
                                                        return (
                                                            <button
                                                                key={contactId}
                                                                className="block text-purple-800 hover:bg-purple-300 hover:text-white px-2 py-1 rounded mb-1"
                                                                onClick={() => handleAddContact(contactList.id, contactId)}
                                                            >
                                                                {contactData?.username}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
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
                            {users ? (
                                Object.values(userContacts).map((contactId) => {
                                    const contactData = users.find((user) => user.uid === contactId);
                                    if (contactData) {
                                        return (
                                            <div key={contactId} className="flex items-center justify-center mb-3">
                                                <div className="flex justify-between items-center w-4/5 bg-purple-100 rounded-full">
                                                    {contactData.photo ? (
                                                        <img src={contactData.photo} alt={`${contactData.username} Avatar`} className=" ml-6 w-10 h-10 rounded-full mr-2" />
                                                    ) : (
                                                        <div className="w-10 h-10 bg-purple-800 rounded-full mr-10 flex items-center justify-center ml-6">
                                                            <FaUser size={20} color="white" />
                                                        </div>
                                                    )}
                                                    <span className="text-lg font-semibold mr-6">{contactData.username}</span>
                                                    <button
                                                        className="text-red-500 hover:text-red-700 mr-6"
                                                        onClick={() => removeContactHandle(contactId)}
                                                    >
                                                        <FaTimes />
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    } else {
                                        return null;
                                    }
                                })
                            ) : (
                                <p>Loading users...</p>
                            )}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default Contacts;