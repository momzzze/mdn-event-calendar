import { get, set, ref, query, orderByChild, equalTo } from "firebase/database";
import { db } from '../config/firebase'

export const createUserHandle = (userData) => {
    return set(ref(db, `users/${userData.username}`), {
        ...userData,
    });
}

export const getUserByHandle = (username) => {
    return get(ref(db, `users/${username}`));
}

export const getUserByPhone = async (phone) => {
    const phoneQuery = query(ref(db, "users"), orderByChild("phone"), equalTo(phone));
    const snapshot = await get(phoneQuery);
    return snapshot;
};

export const getUserData = (uid) => {
    const userDataQuery = query(ref(db, "users"), orderByChild("uid"), equalTo(uid));
    return get(userDataQuery);
};

export const getUserDataByUserId = async (userId) => {
    const userQuery = query(ref(db, "users"), orderByChild("uid"), equalTo(userId));
    const userSnapshot = await get(userQuery);
    const userDatas = userSnapshot.val();
    if (userDatas) {
        const userData = Object.values(userDatas)[0];
        return userData;
    } else {
        return null;
    }
};

export const editUserHandle = async (data) => {
    return set(ref(db, `users/${data.username}`), data);
}

export const getAllUsersData = () => {
    const usersRef = ref(db, 'users');
    return get(query(usersRef))
        .then(snapshot => {
            if (snapshot.exists()) {
                const usersData = snapshot.val();
                const usersArray = Object.keys(usersData).map(userId => ({
                    id: userId,
                    ...usersData[userId]
                }));
                return usersArray;
            }
            return [];
        });
};

export const handleToggleRole = async (userId, currentRole) => {
    const userRef = ref(db, `users/${userId}`);
    const newRole = currentRole;
    try {
        const snapshot = await get(userRef);
        const userData = snapshot.val();
        if (userData) {
            userData.role = newRole;
            await set(userRef, userData);
        } else {
            console.log('User data not found');
        }
    } catch (error) {
        console.error('Error updating user role:', error);
    }
};

export const getUserContacts = async (userId) => {
    if (userId) {
        try {
            const user = await getUserDataByUserId(userId);
            const userContactsRef = await ref(db, `users/${user.username}/contacts`);
            const userContactsSnapshot = await get(userContactsRef);
            const userContactsData = userContactsSnapshot.val();
            if (userContactsData) {
                return Object.keys(userContactsData).map(contactId => contactId);
            } else {
                return [];
            }
        } catch (error) {
            console.error('Error getting user contacts:', error);
            return [];
        }
    }
};

export const getUserByEmail = async (email) => {
    try {
        const emailQuery = query(ref(db, "users"), orderByChild("email"), equalTo(email));
        const snapshot = await get(emailQuery);
        if (snapshot.exists()) {
            const userData = snapshot.val();
            const usersArray = Object.keys(userData).map(userId => ({
                id: userId,
                ...userData[userId]
            }));
            return usersArray;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error getting user by email:', error);
    }
}

export const getUsernameForCreator = async (creatorId) => {
    try {
        const userDataQuery = query(ref(db, "users"), orderByChild("uid"), equalTo(creatorId));        
        const userSnap=await get(userDataQuery);
        if (userSnap.exists()) {
            const userData = userSnap.val();
            const username = Object.keys(userData)[0];
            return username;
        }
        return null; 
    } catch (error) {
        console.error('Error getting creator username:', error);
        return null;
    }
};