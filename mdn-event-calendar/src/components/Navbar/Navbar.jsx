import './Navbar.css';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '@chakra-ui/toast';
import { logoutUser } from '../../services/auth.services';
import { FiUser } from 'react-icons/fi';
import UserDetails from '../Users/UserDetails';
import { HiCalendar } from "react-icons/hi2";
import { userProfileStyles } from '../../common/modal.helper.functions';
import EditUser from '../Users/EditUser';
import logoNav from '../../assets/logoNav.png';
import { Link } from 'react-router-dom';
import DarkMode from '../DarkMode/DarkMode';

const Navbar = () => {
    const [isUserDetailsModalOpen, setUserDetailsModalOpen] = useState(false);
    const [isEditUserModalOpen, setEditUserModalOpen] = useState(false);
    const { setUser, userData, isAdmin } = useAuth();
    const toast = useToast();
    const navigate = useNavigate();
    const location = useLocation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

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
            <nav className="flex items-center justify-between flex-wrap pl-3 pr-6">
                <div className="flex items-center flex-shrink-0 text-white mr-6 lg:mr-72">
                    <RouterLink to="/home">
                        <div style={{ width: '80px', height: '80px' }}>
                            <img
                                src={logoNav}
                                className="w-full h-full"
                                alt="Logo"
                            />
                        </div>
                    </RouterLink>
                </div>
                <div className="block lg:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
                    >
                        <svg
                            className={`fill-current h-3 w-3 ${isOpen ? "hidden" : "block"}`}
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                        </svg>
                        <svg
                            className={`fill-current h-3 w-3 ${isOpen ? "block" : "hidden"}`}
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                        </svg>
                    </button>
                </div>
                <div
                    className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${isOpen ? "block" : "hidden"}`}
                >
                    <div className="text-sm lg:ml-0">
                        <RouterLink
                            to="/"
                            className={`nav-link block sm:ml-[-0.5rem] lg:ml-[-10rem]   mt-4 mb-2 lg:inline-block lg:mt-0 text-lg text-purple-800 font-bold text-lg border-b-2 border-transparent hover:text-purple-300 hover:border-purple-300 duration-200 ${location.pathname === '/' ? 'active' : ''}`}
                        >
                            Home
                        </RouterLink>
                        <RouterLink
                            to="/calendar"
                            className={`nav-link block sm:ml-5 ml-5 mt-2 mb-2 lg:inline-block lg:mt-0 text-lg text-purple-800 font-bold text-lg border-b-2 border-transparent hover:text-purple-300 hover:border-purple-300 duration-200 ${location.pathname === '/calendar' ? 'active' : ''}`}
                        >
                            Calendar
                        </RouterLink>
                        <RouterLink
                            to="/events"
                            className={`nav-link block lg:ml-5 sm:ml-1 ml-5 mt-2 mb-2 lg:inline-block lg:mt-0 text-lg text-purple-800 font-bold text-lg border-b-2 border-transparent hover:text-purple-300 hover:border-purple-300 duration-200 ${location.pathname === '/events' ? 'active' : ''}`}
                        >
                            Events
                        </RouterLink>
                        <RouterLink
                            to="/contacts"
                            className={`nav-link block ml-5 mt-2 lg:inline-block lg:mt-0 text-lg text-purple-800 font-bold text-lg border-b-2 border-transparent hover:text-purple-300 hover:border-purple-300 duration-200 ${location.pathname === '/contacts' ? 'active' : ''}`}
                        >
                            Contacts
                        </RouterLink>
                        {isAdmin && <RouterLink
                            to="/admin"
                            className={`nav-link block ml-5 mt-2 lg:inline-block lg:mt-0 text-lg text-purple-800 font-bold text-lg border-b-2 border-transparent hover:text-purple-300 hover:border-purple-300 duration-200 ${location.pathname === '/admin' ? 'active' : ''}`}
                        >
                            Admin Board
                        </RouterLink>}
                    </div>
                    <div className="flex flex-col lg:flex-row lg:items-center ml-auto">
                        <div className="relative">
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
                            <div ref={dropdownRef} className={`absolute sm:right-60 lg:right-0 mt-2 w-40 bg-white border border-gray-300 rounded shadow-lg ${isDropdownOpen ? 'block' : 'hidden'}`}>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-purple-800 font-bold text-lg hover:text-purple-300 hover:border-purple-300 duration-200"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        toggleEditUserModal();
                                    }}
                                >
                                    Edit Profile
                                </a>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-purple-800 font-bold text-lg hover:text-purple-300 hover:border-purple-300 duration-200"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        openUserDetailsModal();
                                    }}
                                >
                                    Profile
                                </a>
                            </div>
                        </div>
                        <button
                            onClick={onLogout}
                            data-te-ripple-init data-te-ripple-color="light"
                            className="block lg:inline-block text-lg text-purple-800 font-bold text-lg border-b-2 border-transparent hover:text-purple-300 hover:border-purple-300 duration-200 lg:mr-5 sm:mr-[-1rem]"
                        >
                            Logout
                        </button>
                        <div className="flex justify-center items-center">
                            <DarkMode />
                        </div>
                    </div>
                </div>
                <UserDetails isOpen={isUserDetailsModalOpen} onClose={closeUserDetailsModal} data={userData} />
                <EditUser isOpen={isEditUserModalOpen} onClose={toggleEditUserModal} data={userData} />
            </nav >

        </>
    )
}
export default Navbar;


{/* <nav className="relative flex w-full items-center justify-between bg-white py-2 shadow-none lg:flex-wrap lg:justify-center mb-11">
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
                <Link to="/home" className="absolute left-1/2 transform -translate-x-1/2 -top-8">
                    <img src={logoNav} alt="logo here" style={{ height: '139px', width: 'auto' }} />
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
                        <a href="#" className="block px-4 py-2 text-purple-800 font-bold text-lg hover:text-purple-300 hover:border-purple-300 duration-200" onClick={event => { event.preventDefault(); toggleEditUserModal(); }}>Edit Profile</a>
                        <a href="#" className="block px-4 py-2 text-purple-800 font-bold text-lg hover:text-purple-300 hover:border-purple-300 duration-200" onClick={event => { event.preventDefault(); openUserDetailsModal(); }}>Profile</a>
                    </div>

                </div>
                <button
                    onClick={onLogout}
                    data-te-ripple-init data-te-ripple-color="light"
                    className="p-4 text-purple-800 font-bold text-lg border-b-2 hover:text-purple-300 border-transparent hover:border-purple-300 duration-200 active"
                >
                    Logout
                </button>
                <DarkMode />
            </nav>


            <UserDetails isOpen={isUserDetailsModalOpen} onClose={closeUserDetailsModal} data={userData} />
            <EditUser isOpen={isEditUserModalOpen} onClose={toggleEditUserModal} data={userData} /> */}

{/* <div className="text-purple-800 text-lg ml-auto">
                   <span className='custom-font'> MDN<HiCalendar style={{ display: "inline" }} />E.S.E</span>
                </div> */}