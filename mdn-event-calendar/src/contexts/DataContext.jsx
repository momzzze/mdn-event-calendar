import { createContext, useContext, useEffect, useState } from 'react';
import { getAllUsersData, getUserContacts } from '../services/user.service'; // Import your user service
import { getAllContactListsForUser, getPendingInvitesForUser, getSendingInvitesFromUser } from '../services/contacts.service';
import { useAuth } from './AuthContext';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [users, setUsers] = useState(null);
    const [contactLists, setContactLists] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [pendingInvites, setPendingInvites] = useState(null); 
    const [sendingInvites, setSendingInvites] = useState(null);
    const [userContacts, setUserContacts] = useState(null);

    const { userData } = useAuth();

    const refreshData = () => {
        setRefresh(!refresh);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const usersData = await getAllUsersData();
                const contactsData = await getAllContactListsForUser(userData?.uid);
                const pendingInvitesData = await getPendingInvitesForUser(userData?.uid);
                const userContactsData = await getUserContacts(userData?.uid);
                const sendingInvitesData = await getSendingInvitesFromUser(userData?.uid);

                setUsers(usersData);
                setContactLists(contactsData);
                setPendingInvites(pendingInvitesData);
                setUserContacts(userContactsData);
                setSendingInvites(sendingInvitesData)
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        }
        fetchData();
    }, [refresh, userData,pendingInvites,setPendingInvites]);
   
    return (
        <DataContext.Provider value={{ users, setUsers, contactLists,pendingInvites,setPendingInvites,userContacts,setUserContacts,sendingInvites,setSendingInvites,setContactLists, loading, error, refreshData }}>
            {children}
        </DataContext.Provider>
    )
}
