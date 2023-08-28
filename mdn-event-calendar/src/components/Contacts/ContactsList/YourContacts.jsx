import { FaTimes, FaUser } from "react-icons/fa";
import { useData } from "../../../contexts/DataContext";
import { useAuth } from "../../../contexts/AuthContext";
import { removeContact } from "../../../services/contacts.service";

const YourContacts = () => {
    const { users, userContacts,setUserContactsData  } = useData();
    const { userData } = useAuth();

    const removeContactHandle = async (contactId) => {
        const success = await removeContact(userData.uid, contactId)
        if(success){
            await setUserContactsData();            
        }
    }

    return (
        <div>
            <h3 className="text-lg font-semibold mb-2">Your Contacts</h3>
            {userContacts ? (
                Object.values(userContacts).map((contactId) => {
                    const contactData = users?.find((user) => user.uid === contactId);
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
    )
}

export default YourContacts;