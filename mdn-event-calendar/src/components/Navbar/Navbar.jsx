import { Link as RouterLink, useNavigate } from 'react-router-dom'
import './Navbar.css'
import { useContext } from 'react';
import { AuthContext, useAuth } from '../../contexts/AuthContext';
import { useToast } from '@chakra-ui/toast';
import { logoutUser } from '../../services/auth.services';

const Navbar = () => {
    const { setUser } = useAuth();
    const toast = useToast();
    const navigate = useNavigate();

    const onLogout = async () => {
        try {
            await logoutUser();

            setUser({
                user: null,
            });
            toast({
                title: "Logged out successfully",
                status: "success",
                isClosable: true,
                position: "top",
                duration: 5000,
            });
            navigate("/landing");
        } catch (error) {
            console.error('Logout error:', error);
        }
    };
    return (
        <>
            <div className="bg-blue-500 p-4">
                <div className="container mx-auto flex items-center">
                    <RouterLink to="/" className="mr-4 text-white font-bold text-lg">
                        Home
                    </RouterLink>
                    <RouterLink to="/calendar" className="mr-4 text-white font-bold text-lg">
                        Calendar
                    </RouterLink>
                    <RouterLink to="/events" className="mr-4 text-white font-bold text-lg">
                        Events
                    </RouterLink>
                    <RouterLink to="/contacts" className="mr-4 text-white font-bold text-lg">
                        Contacts
                    </RouterLink>
                    <div className="flex-grow"></div>
                    <button
                        onClick={onLogout}
                        className="text-white font-bold text-lg cursor-pointer transition duration-300 hover:text-blue-200"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </>
    )
}

export default Navbar