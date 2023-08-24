import { get, set, ref, query, orderByChild, equalTo } from "firebase/database";
import { auth, db } from '../config/firebase'
// import { sendPasswordResetEmail } from "firebase/auth";

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

export const editUserHandle = async (data) => {
    return set(ref(db, `users/${data.username}`), data);
}