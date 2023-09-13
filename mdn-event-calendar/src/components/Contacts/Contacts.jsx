import ContactsSidebar from "./ContactsSidebar";
import ContactsList from "./ContactList";
import "./Contacts.css";

const Contacts = () => {
    return (
        <div className="ml-3 mr-3 ">
            <div className="bg-purple-800 text-white py-2 px-4 mt-3 mb-3 ">
                <h1 className="text-3xl font-semibold">Contacts</h1>
            </div>
            <div className="flex bg-gray-100  border-2">
                <ContactsSidebar />
                <ContactsList />
            </div>
        </div>
    );
}

export default Contacts;
