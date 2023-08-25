import { createContext, useContext, useEffect, useState } from 'react';
import { getAllUsersData } from '../services/user.service'; // Import your user service
import { getAllContactListsForUser } from '../services/contacts.service';
import { useAuth } from './AuthContext';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [users, setUsers] = useState(null);
    const [contactLists, setContactLists] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(false);
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
                setUsers(usersData);
                setContactLists(contactsData);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        }
        fetchData();
    }, [refresh, userData, contactLists]);

    return (
        <DataContext.Provider value={{ users, setUsers, contactLists, setContactLists, loading, error, refreshData }}>
            {children}
        </DataContext.Provider>
    )
}
