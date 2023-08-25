import './Navbar.css';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '@chakra-ui/toast';
import { logoutUser } from '../../services/auth.services';
import { FiUser } from 'react-icons/fi';
import UserDetails from '../Users/UserDetails';
import { userProfileStyles } from '../../common/modal.helper.functions';
import EditUser from '../Users/EditUser';
import logoNav from '../../assets/logoNav.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isUserDetailsModalOpen, setUserDetailsModalOpen] = useState(false);
    const [isEditUserModalOpen, setEditUserModalOpen] = useState(false);
    const { setUser, userData, isAdmin } = useAuth();
    const toast = useToast();
    const navigate = useNavigate();
    const location = useLocation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const openUserDetailsModal = () => {
        setUserDetailsModalOpen(true);
    };
    const closeUserDetailsModal = () => {
        setUserDetailsModalOpen(false);
    };
    const toggleEditUserModal = () => {
        setEditUserModalOpen(!isEditUserModalOpen);
    };
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

    useEffect(() => {
        const closeDropdownOnOutsideClick = (e) => {
            if (isDropdownOpen && !dropdownRef.current.contains(e.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', closeDropdownOnOutsideClick);

        return () => {
            document.removeEventListener('mousedown', closeDropdownOnOutsideClick);
        };
    }, [isDropdownOpen]);

    return (
        <>
            <nav className="relative flex w-full items-center justify-between bg-white py-2 shadow-none lg:flex-wrap lg:justify-center"> {/* Updated justify-center */}
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
                    {isAdmin && <RouterLink
                        to="/admin"
                        className={`nav-link p-4 text-lg p-4 text-purple-800 font-bold text-lg border-b-2 border-transparent hover:text-purple-300 hover:border-purple-300 duration-200 ${location.pathname === '/admin' ? 'active' : ''}`}
                    >
                        Admin Board
                    </RouterLink>}
                </div>
                <Link to='/home' className="logo">
                <img src={logoNav} alt="logo here" style={{ height: '200px', width: 'auto' }} /> 
                </Link>
                <div className="relative ml-auto">
                    <button
                        onClick={toggleDropdown}
                        className="p-1 rounded-full focus:outline-none mr-4"
                    >
                        {userData?.photo ? (
                            <img
                                src={userData?.photo}
                                alt="Avatar"
                                className="h-8 w-8 rounded-full"
                            />
                        ) : (
                            <FiUser className="h-8 w-8 text-purple-800 hover:text-purple-300" />
                        )}
                    </button>
                    <div ref={dropdownRef} className={`absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded shadow-lg ${isDropdownOpen ? 'block' : 'hidden'}`}>
                        <a href="#" className="block px-4 py-2 text-purple-800 font-bold text-lg hover:text-purple-300 hover:border-purple-300 duration-200" onClick={toggleEditUserModal}>Edit Profile</a>
                        <a href="#" className="block px-4 py-2 text-purple-800 font-bold text-lg hover:text-purple-300 hover:border-purple-300 duration-200" onClick={openUserDetailsModal}>Profile</a>
                    </div>
                </div>
                <button
                    onClick={onLogout}
                    data-te-ripple-init data-te-ripple-color="light"
                    className="p-4 text-purple-800 font-bold text-lg border-b-2 hover:text-purple-300 border-transparent hover:border-purple-300 duration-200 active"
                >
                    Logout
                </button>
            </nav>

            <UserDetails isOpen={isUserDetailsModalOpen} onClose={closeUserDetailsModal} data={userData} />
            <EditUser isOpen={isEditUserModalOpen} onClose={toggleEditUserModal} data={userData} />
        </>
    )
}

export default Navbar;
