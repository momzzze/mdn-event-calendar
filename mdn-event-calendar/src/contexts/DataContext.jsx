import { createContext, useContext, useEffect, useState } from 'react';
import { getAllUsersData, getUserContacts } from '../services/user.service'; 
import { getAllContactListsForUser, getPendingInvitesForUser, getSendingInvitesFromUser } from '../services/contacts.service';
import { getPublicEvents, getPrivateEvents, getPublicEventsCurrentUserParticipate } from '../services/event.service';
import { useAuth } from './AuthContext';
import { db } from '../config/firebase';
import { off, onValue, ref, set } from 'firebase/database';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [users, setUsers] = useState(null);
    const [userContacts, setUserContacts] = useState([]);
    const [contactLists, setContactLists] = useState(null);
    const [sendingInvites, setSendingInvites] = useState(null);
    const [pendingInvites, setPendingInvites] = useState(null);
    const { userData } = useAuth();
    const [error, setError] = useState(null);
    const [publicEvents, setPublicEvents] = useState(null);
    const [publicEventsCurrentUserParticipate, setPublicEventsCurrentUserParticipate] = useState(null);
    const [privateEvents, setPrivateEvents] = useState(null);

    const [refresh, setRefresh] = useState(false);
    const refreshData = () => {
        setRefresh(!refresh);
    }
    
    const setUsersData = async () => {
        try {
            const usersData = await getAllUsersData();
            setUsers(usersData);
        } catch (error) {
            setError(error);
        }
    };
    const setUserContactsData = async () => {
        try {
            const userContactsData = await getUserContacts(userData?.uid);
            setUserContacts(userContactsData);
        } catch (error) {
            setError(error);
        }
    };
    const setSendingInvitesData = async () => {
        try {
            const sendingInvitesData = await getSendingInvitesFromUser(userData?.uid);
            setSendingInvites(sendingInvitesData);
        } catch (error) {
            setError(error);
        }
    };
    const setPendingInvitesData = async () => {
        try {
            const pendingInvitesData = await getPendingInvitesForUser(userData?.uid);
            setPendingInvites(pendingInvitesData);
        } catch (error) {
            setError(error);
        }
    };
    const setContactListsData = async () => {
        try {
            const contactListData = await getAllContactListsForUser(userData?.uid);
            setContactLists(contactListData);
        } catch (error) {
            setError(error);
        }
    };
    const setPublicEventsData = async () => {
        try {
            const publicEventsData = await getPublicEvents();
            setPublicEvents(publicEventsData);
        } catch (error) {
            setError(error);
        }
    }
    const setPublicEventsCurrentUserParticipateData = async () => {
        try {
            const publicEventsCurrentUserParticipateData = await getPublicEventsCurrentUserParticipate(userData?.uid);
            setPublicEventsCurrentUserParticipate(publicEventsCurrentUserParticipateData);
        } catch (error) {
            setError(error);
        }
    }
    const setPrivateEventsData = async () => {
        try {
            const privateEventsData = await getPrivateEvents(userData?.uid);
            setPrivateEvents(privateEventsData);
        } catch (error) {
            setError(error);
        }
    }

    useEffect(() => {
        setUsersData();
        setSendingInvitesData();
        setUserContactsData();
        setPendingInvitesData();
        setContactListsData();
        setPublicEventsData();
        setPublicEventsCurrentUserParticipateData();
        setPrivateEventsData();
    }, [userData?.uid]);
      

    useEffect(() => {
        const contactsRef = ref(db, 'contacts');
        const contactsListener = onValue(contactsRef, (snapshot) => {
            const contactsData = snapshot.val();
            const pendingInvitesData = [];

            if (contactsData) {
                Object.entries(contactsData).forEach(([contactId, contact]) => {
                    if (contact.status === 'pending') {
                        pendingInvitesData.push({
                            id: contactId,
                            senderId: contact.senderId,
                            receiverId: contact.receiverId
                        });
                    }
                });
            }
            setPendingInvites(pendingInvitesData);
        });
        return () => {
            off(contactsRef, 'value', contactsListener);
        };
    }, []);

    useEffect(() => {
        const userContactsRef = ref(db, `users/${userData?.username}/contacts`);
        const userContactsListener = onValue(userContactsRef, (snapshot) => {
            const contactsData = snapshot.val();
            if (contactsData !== undefined && contactsData !== null) {
                const userContactsArray = Object.keys(contactsData);
                setUserContacts(userContactsArray);
            }
        });
        return () => {
            off(userContactsRef, 'value', userContactsListener);
        };
    }, [userData?.uid]);


    useEffect(() => {
        if (userData) {
            const fetchData = async () => {
                try {
                    const sendingInvitesData = await getSendingInvitesFromUser(userData?.uid);
                    setSendingInvites(sendingInvitesData);
                } catch (err) {
                    setError(err);
                }
            };
            fetchData();
        }
    }, [userData]);


    return (
        <DataContext.Provider value={{ users, setUsersData, setUserContactsData, setSendingInvitesData, setPendingInvitesData, setContactListsData, contactLists, pendingInvites, setPendingInvites, userContacts, setUserContacts, sendingInvites, setSendingInvites, setContactLists, error, refreshData, publicEvents, publicEventsCurrentUserParticipate, privateEvents,setPublicEventsData,setPublicEventsCurrentUserParticipateData,setPrivateEventsData }}>
            {children}
        </DataContext.Provider>
    )
}