import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { getUserData } from "../services/user.service";


export const AuthContext = createContext({
    user: null,
    userData: null,
    setUser: () => { },
});

export const AuthProvider = ({ children }) => {
    const [user] = useAuthState(auth);
    const [userData, setUserData] = useState(null);
    const [appState, setAppState] = useState({
        user,
        userData: null,
    });

    const isAdmin = () => {       
        return userData?.role === 'admin';
    };

    useEffect(() => {
        if (user !== appState.user) {
            setAppState({ ...appState, user });
        }
    }, [user,appState]);

    useEffect(() => {
        if (user) {
            getUserData(user.uid)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const userData = snapshot.val()[Object.keys(snapshot.val())[0]];
                        setUserData(userData);
                    }
                })
                .catch((error) => {
                    console.error('Error loading user data:', error);
                });
        } else {
            setUserData(null);
        }
    }, [user]);
    
    return (
        <AuthContext.Provider value={{ user, userData,setUser: setUserData, appState, isAuthenticated: !!user,isAdmin:!!isAdmin() }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);