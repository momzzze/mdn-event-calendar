import { get, set, push, ref, query, orderByChild, equalTo, remove, update } from "firebase/database";
import { auth, db } from '../config/firebase'
import { getUserData } from "./user.service";


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
export const addContactToList = async (listId, contactId) => {
    try {
        const contactListRef = ref(db, `contactLists/${listId}`);
        const contactListSnapshot = await get(contactListRef);
        if (contactListSnapshot.exists()) {
            const contactListData = contactListSnapshot.val();
            const updatedContacts = {
                ...contactListData.contacts,
                [contactId]: true,
            };
            await set(ref(db, `contactLists/${listId}/contacts`), updatedContacts);
            return true;
        } else {
            console.error('Contact list not found');
            return false;
        }
    } catch (error) {
        console.error('Error adding contact to list:', error);
        return error
    }
};
export const updateContactList = async (listId, updatedContactList) => {
    try {
        const contactListRef = ref(db, `contactLists/${listId}`);
        await set(contactListRef, updatedContactList);
    } catch (error) {
        console.error('Error updating contact list:', error);
    }
};

export const deleteContactList = async (listId) => {
    try {
        const contactListRef = ref(db, `contactLists/${listId}`);
        await remove(contactListRef);
        return true;
    } catch (error) {
        console.error('Error deleting contact list:', error);
        return false;
    }
};

export const sendContactRequest = async (senderId, receiverId) => {
    const contactsRef = ref(db, 'contacts');
    const newContactRequest = {
        senderId,
        receiverId,
        status: 'pending'
    };
    try {
        const newContactRequestRef = push(contactsRef);
        await set(newContactRequestRef, newContactRequest);
        return true;
    } catch (error) {
        console.error('Error sending contact request:', error);
        return false;
    }
};


export const acceptContactRequest = async (contactRequestId, senderId, receiverId) => {
    const contactRequestRef = ref(db, `contacts/${contactRequestId}`);
    try {
        await set(contactRequestRef, { status: 'accepted' });
        await addContact(receiverId, senderId);
        return true;
    } catch (error) {
        console.error('Error accepting contact request:', error);
        return false;
    }
};

export const rejectContactRequest = async (contactRequestId) => {
    const contactRequestRef = ref(db, `contacts/${contactRequestId}`);
    try {
        await set(contactRequestRef, { status: 'rejected' });
        return true;
    } catch (error) {
        console.error('Error rejecting contact request:', error);
        return false;
    }
};

export const getContactsForUser = async (userId) => {
    console.log(userId);
    // const contactsRef = ref(db, 'contacts');
    // const contactsQuery = query(contactsRef, orderByChild('status'), equalTo('accepted'));

    // try {
    //     const contactsSnapshot = await get(contactsQuery);
    //     const contactsData = [];

    //     contactsSnapshot.forEach((childSnapshot) => {
    //         const contact = childSnapshot.val();
    //         if (contact.senderId === userId) {
    //             contactsData.push({ id: childSnapshot.key, userId: contact.receiverId });
    //         } else if (contact.receiverId === userId) {
    //             contactsData.push({ id: childSnapshot.key, userId: contact.senderId });
    //         }
    //     });

    //     return contactsData;
    // } catch (error) {
    //     console.error('Error getting contacts:', error);
    //     return [];
    // }
};

export const getPendingInvitesForUser = async (userId) => {
    try {
        const contactsRef = ref(db, 'contacts');
        const contactsQuery = query(contactsRef, orderByChild('receiverId'), equalTo(userId));

        const invitesSnapshot = await get(contactsQuery);

        const pendingInvites = [];
        invitesSnapshot.forEach((childSnapshot) => {
            const invite = childSnapshot.val();
            if (invite.status === 'pending' && invite.senderId !== userId) {
                pendingInvites.push({
                    id: childSnapshot.key,
                    sender: invite.senderId,
                    receiver: invite.receiverId,
                    status: invite.status,
                });
            }
        });
        return pendingInvites;
    } catch (error) {
        console.error('Error getting pending invites:', error);
    }
};
export const getSendingInvitesFromUser = async (userId) => {
    try {
        const contactsRef = ref(db, 'contacts');
        const contactsQuery = query(contactsRef, orderByChild('senderId'), equalTo(userId));

        const invitesSnapshot = await get(contactsQuery);

        const sendingInvites = [];
        invitesSnapshot.forEach((childSnapshot) => {
            const invite = childSnapshot.val();
            if (invite.status === 'pending' && invite.receiverId !== userId) {
                sendingInvites.push({
                    id: childSnapshot.key,
                    sender: invite.senderId,
                    receiver: invite.receiverId,
                    status: invite.status,
                });
            }
        });
        return sendingInvites;
    } catch (error) {
        console.error('Error getting pending invites:', error);
    }
};


export const addContact = async (senderId, receiverId) => {
    try {
        const senderUserDataQuery = query(ref(db, "users"), orderByChild("uid"), equalTo(senderId));
        const receiverUserDataQuery = query(ref(db, "users"), orderByChild("uid"), equalTo(receiverId));
        const senderUserDataSnapshot = await get(senderUserDataQuery);
        const receiverUserDataSnapshot = await get(receiverUserDataQuery);
        if (!senderUserDataSnapshot.exists() || !receiverUserDataSnapshot.exists()) {
            console.error('User not found');
            return false;
        }
        const senderUser = Object.values(senderUserDataSnapshot.val())[0];
        const receiverUser = Object.values(receiverUserDataSnapshot.val())[0];
        const senderContactsRef = ref(db, `users/${senderUser.username}/contacts/${receiverId}`);
        const receiverContactsRef = ref(db, `users/${receiverUser.username}/contacts/${senderId}`);
        await set(senderContactsRef, true);
        await set(receiverContactsRef, true);
        return true;
    } catch (error) {
        console.error('Error adding contact:', error);
        return false;
    }
};

export const removeContact = async (user1Id, user2Id) => {
    try {
        const senderUserDataQuery = query(ref(db, "users"), orderByChild("uid"), equalTo(user1Id));
        const receiverUserDataQuery = query(ref(db, "users"), orderByChild("uid"), equalTo(user2Id));
        const [senderUserDataSnapshot, receiverUserDataSnapshot] = await Promise.all([
            get(senderUserDataQuery),
            get(receiverUserDataQuery)
        ]);
        const senderUser = Object.values(senderUserDataSnapshot.val())[0];
        const receiverUser = Object.values(receiverUserDataSnapshot.val())[0];
        if (!senderUser || !receiverUser) {
            console.error('One or both users not found');
            return false;
        }
        const senderContactsRef = ref(db, `users/${senderUser.username}/contacts/${receiverUser.uid}`);
        const receiverContactsRef = ref(db, `users/${receiverUser.username}/contacts/${senderUser.uid}`);
        await set(senderContactsRef, null);
        await set(receiverContactsRef, null);
        return true;
    } catch (error) {
        console.error("Error removing contact:", error);
        return false;
    }
};