import './Navbar.css';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext, useAuth } from '../../contexts/AuthContext';
import { useToast } from '@chakra-ui/toast';
import { logoutUser } from '../../services/auth.services';

const Navbar = () => {
    const { setUser } = useAuth();
    const toast = useToast();
    const navigate = useNavigate();
    const location = useLocation();

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
            navigate("/");
        } catch (error) {
            console.error('Logout error:', error);
        }
    };
    return (
        <>
            <nav className="relative flex w-full items-center justify-between bg-white py-2 shadow-none lg:flex-wrap lg:justify-start">
                <div className="flex w-full flex-wrap items-center justify-between px-6">
                    <div className="flex items-center">
                        <RouterLink
                            to="/"
                            className={`nav-link p-4 text-lg p-4 text-purple-800 font-bold text-lg border-b-2 border-transparent hover:text-purple-300 hover:border-purple-300 duration-200 ${location.pathname === '/' ? 'active' : ''}`}
                        >
                            Home
                        </RouterLink>
                        <RouterLink
                            to="/calendar"
                            className={`nav-link p-4 text-lg p-4 text-purple-800 font-bold text-lg border-b-2 border-transparent hover:text-purple-300 hover:border-purple-300 duration-200 ${location.pathname === '/calendar' ? 'active' : ''}`}
                        >
                            Calendar
                        </RouterLink>
                        <RouterLink
                            to="/events"
                            className={`nav-link p-4 text-lg p-4 text-purple-800 font-bold text-lg border-b-2 border-transparent hover:text-purple-300 hover:border-purple-300 duration-200 ${location.pathname === '/events' ? 'active' : ''}`}
                        >
                            Events
                        </RouterLink>
                        <RouterLink
                            to="/contacts"
                            className={`nav-link p-4 text-lg p-4 text-purple-800 font-bold text-lg border-b-2 border-transparent hover:text-purple-300 hover:border-purple-300 duration-200 ${location.pathname === '/contacts' ? 'active' : ''}`}
                        >
                            Contacts
                        </RouterLink>
                    </div>
                    <span className="[&>svg]:ml-2 [&>svg]:mr-3 [&>svg]:h-6 [&>svg]:w-6 [&>svg]:lg:ml-0">
                        LOGO HERE
                    </span>
                    <button
                        onClick={onLogout}
                        data-te-ripple-init data-te-ripple-color="light"
                        className="p-4 text-purple-800 font-bold text-lg border-b-2 hover:text-purple-300 border-transparent hover:border-purple-300 duration-200 active"
                    >
                        Logout
                    </button>
                </div>
            </nav>
        </>
    )
}

export default Navbar