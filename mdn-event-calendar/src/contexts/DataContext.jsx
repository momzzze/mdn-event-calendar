import { createContext, useContext, useEffect, useState } from 'react';
import { getAllUsersData } from '../services/user.service'; // Import your user service

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const refreshData = () => {
        setRefresh(!refresh);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const usersData = await getAllUsersData();
                setUsers(usersData);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        }
        fetchData();
    }, [refresh]);

    return (
        <DataContext.Provider value={{ users,setUsers, loading, error, refreshData }}>
            {children}
        </DataContext.Provider>
    )
}
