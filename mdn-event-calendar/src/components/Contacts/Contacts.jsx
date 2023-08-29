import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/AuthContext";
import { acceptContactRequest, addContactToList, createContactList, deleteContactList, rejectContactRequest, removeContact, sendContactRequest, updateContactList } from "../../services/contacts.service";
import { useData } from "../../contexts/DataContext";
import { FaTimes, FaUser } from "react-icons/fa";
import { getUserContacts } from "../../services/user.service";
import { FaPlus } from "react-icons/fa";
import ContactsSidebar from "./ContactsSidebar";
import ContactsList from "./ContactList";


const Contacts = () => {
    return (
        <div className="flex h-screen bg-gray-100  border-2 ">          
            <ContactsSidebar />
            <ContactsList />
        </div>
    );
}

export default Contacts;