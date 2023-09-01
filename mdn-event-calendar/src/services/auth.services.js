import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { getUserByEmail } from "./user.service";

export const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
}


export const loginUser = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = await getUserByEmail(email);
    if (user[0] && user[0].role === "banned") {
        await signOut(auth);
        throw new Error("Your account has been banned.");
      }
      return userCredential;
}


export const logoutUser = () => {
    return signOut(auth);
}