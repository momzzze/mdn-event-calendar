
import { useData } from "../../contexts/DataContext";
import YourContacts from "./ContactsList/YourContacts";
import PendingInvites from "./ContactsList/PendingInvites";
import AddListForm from "./ContactsList/AddListForm";
import ContactListItem from "./ContactsList/ContactListItem";

const ContactsList = () => {
    const { contactLists } = useData();

    return (
        <div className="w-1/3 bg-white p-4 shadow-md bg-purple-50">
            <h3 className="text-lg font-semibold mb-2">Your Contact Lists</h3>
            <ul className="space-y-2 mb-6 mt-6">
                {contactLists && contactLists.map((contactList, index) => (
                    <ContactListItem key={contactList.id} contactList={contactList} index={index} />
                ))}
                <AddListForm />
            </ul>
            <div className="flex flex-col">
                <PendingInvites />
                <YourContacts />
            </div>
        </div>
    );
}

export default ContactsList;