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