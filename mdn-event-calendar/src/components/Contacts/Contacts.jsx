import ContactsSidebar from "./ContactsSidebar";
import ContactsList from "./ContactList";
import Footer from "../Footer/Footer";
import "./Contacts.css";

const Contacts = () => {
    return (
        <div className="contacts-container">
            <div className="flex bg-gray-100  border-2 ">
                <ContactsSidebar />
                <ContactsList />
            </div>
            <Footer />
        </div>
    );
}

export default Contacts;
