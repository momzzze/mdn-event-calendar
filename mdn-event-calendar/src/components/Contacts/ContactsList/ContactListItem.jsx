import { useEffect, useRef, useState } from "react";
import { addContactToList, deleteContactList, updateContactList } from "../../../services/contacts.service";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useData } from "../../../contexts/DataContext";

const ContactListItem = ({ contactList,index }) => {
    const [selectedContactList, setSelectedContactList] = useState(null);
    const [activeAccordion, setActiveAccordion] = useState(null);
    const {users,userContacts,contactLists,setContactListsData} = useData();
    
    const toggleContactListDropdown = (listId) => {
        setSelectedContactList(listId === selectedContactList ? null : listId);
    };

    const handleDeleteContactList = async (listId) => {
        const success = await deleteContactList(listId);
        if (success) {
            await setContactListsData()
         }
    }

    const toggleAccordion = (index) => {
        if (activeAccordion === index) {
            setActiveAccordion(null);
        } else {
            setActiveAccordion(index);
        }
    };
    const handleSelectContact = (listId, contactId) => {
        handleAddContact(listId, contactId);
        setSelectedContactList(null); 
    };
    const handleAddContact = async (listId, contactId) => {
        const success = await addContactToList(listId, contactId);
        if (success) {
            await setContactListsData()
         }
    };
    const handleRemoveContact = async (listId, contactId) => {
        try {
            const updatedContactList = { ...contactLists.find(list => list.id === listId) };
            delete updatedContactList.contacts[contactId];
            await updateContactList(listId, updatedContactList);
            await setContactListsData()
        } catch (error) {
            console.error('Error removing contact:', error);
        }
    };

    return (
        <>
            <li>
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
                                                    onClick={() => handleSelectContact(contactList.id, contactId)} 
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
        </>
    )
}

export default ContactListItem;