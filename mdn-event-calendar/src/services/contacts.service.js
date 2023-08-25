import { get, set, push, ref, query, orderByChild, equalTo } from "firebase/database";
import { auth, db } from '../config/firebase'


export const createContactList = async (name, owner) => {
    const contactListsRef = ref(db, 'contactLists');
    try {
        const newContactListRef = push(contactListsRef);
        const newContactList = {
            id: newContactListRef.key,
            name,
            owner,
            contacts: {},
        };
        await set(newContactListRef, newContactList);
        return newContactList;
    } catch (error) {
        return error.message;
    }
}

export const getAllContactListsForUser = async (userId) => {
    const contactListsRef = ref(db, 'contactLists');
    const contactListsQuery = query(contactListsRef, orderByChild('owner'), equalTo(userId));
    
    try {
        const contactListsSnapshot = await get(contactListsQuery); // Use contactListsQuery
        const contactListsData = [];

        contactListsSnapshot.forEach((childSnapshot) => {
            const contactList = childSnapshot.val();
            contactListsData.push(contactList);
        });

        return contactListsData;
    } catch (error) {
        return error.message;
    }
}
