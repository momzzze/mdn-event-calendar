import { useState } from 'react';
import './LandingPage.css';
import { Link as RouterLink } from 'react-router-dom';
import { FaCalendarAlt, FaCalendar, FaUser, FaRoute } from 'react-icons/fa';
import SignIn from '../Auth/Login/Signin';
import SignUp from '../Auth/Register/Signup';
import { closeSignInModal, closeSignUpModal } from '../../common/auth.helper.functions';
import Calendar from '../Calendar/Calendar';
import MonthCalendarLandingPage from './Calendar/MonthCalendarLandingPage';
import logoNav from '../../assets/logoNav.png';
import Footer from '../Footer/Footer';
import Miroslav from '../../assets/Miroslav.jpg';
import Denitsa from '../../assets/Denitsa.jpg';
import Nikola from '../../assets/Nikola.jpg';

const LandingPage = () => {
    const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

    const openSignInModal = () => {
        setIsSignInModalOpen(true);
        setIsSignUpModalOpen(false);
    };

    const openSignUpModal = () => {
        setIsSignInModalOpen(false);
        setIsSignUpModalOpen(true);
    };

    return (
        <div className="min-h-screen">
            <nav className="relative flex w-full items-center justify-between bg-white py-2 shadow-none lg:flex-wrap lg:justify-start" data-te-navbar-ref>
                <div className="flex w-full flex-wrap items-center justify-between px-6">
                    <div className="flex items-center">
                        <RouterLink role="button" className="absolute left-4 top--2">
                            <img src={logoNav} alt="logo here" style={{ height: '129px', width: 'auto' }} />
                        </RouterLink>
                    </div>
                    <RouterLink className="mb-2 inline-block rounded bg-primary px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal transition duration-150 ease-in-out hover:bg-gradient-iridescent focus:outline-none focus:ring-0 active:bg-primary-700 dark:hover:shadow-none md:mr-2 md:mb-0 custom-link-hover-nav" data-te-ripple-init data-te-ripple-color="light" onClick={() => openSignInModal(setIsSignInModalOpen)} role="button" style={{ color: 'black' }}>
                        Sign In
                    </RouterLink>
                </div>
            </nav>
            <div className="bg-gradient-iridescent py-24 px-6 text-center dark:bg-neutral-900">
                <h1 className="mt-2 mb-16 text-5xl font-bold tracking-tight text-whiteh1 md:text-6xl xl:text-7xl heartbeat">
                    Wanna party? <br />
                    <span className="text-primary">Welcome to our music event calendar and join the rave!🎊</span>
                </h1>

                <RouterLink className="mb-2 inline-block rounded bg-white px-16 py-4 text-sm font-extrabold uppercase leading-normal transition duration-150 ease-in-out hover:bg-gradient-iridescent focus:outline-none focus:ring-0 active:bg-primary-700 dark:hover:shadow-none md:mr-2 md:mb-0 custom-link-hover" data-te-ripple-init data-te-ripple-color="light" onClick={() => openSignUpModal(setIsSignUpModalOpen)} role="button">
                    Get started
                </RouterLink>
            </div>
            <section id='features' className='w-10/12 p-6 m-12 lg:ml-40 sm:ml-20 ml-10'>
                <h2 className="mt-2 mb-8 text-4xl font-bold tracking-tight text-whiteh1 h1 md:text-4xl xl:text-5xl text-gradient bg-gradient-to-r from-purple-300 to-purple-800 inline-block p-3 rounded-lg shadow-lg animate-pulse">Our Features🔊📅</h2>

                <hr className='mx-auto bg-purple-800 dark:bg-white w-1/2' />
                <ul className="list-none mx-auto my-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    <li className="bg-white border border-solid border-purple-800 dark:border-white rounded-lg shadow-xl p-6 transition-transform transform hover:scale-105 relative">
                        <div className="absolute top-0 left-0 w-full h-4 bg-purple-800 rounded-t-lg"></div>
                        <div className="relative mb-4 text-purple-800">
                            <FaCalendarAlt className="text-5xl" />
                        </div>
                        <h2 className="text-xl font-bold mb-4 text-purple-800">Personal Calendar📅</h2>
                        <p className="text-gray-600 dark:text-black-300 font-bold">Plan your party day with precision using our Personal Calendar.</p>
                    </li>
                    <li className="bg-white border border-solid border-purple-800 dark:border-white rounded-lg shadow-xl p-6 transition-transform transform hover:scale-105">
                        <div className="absolute top-0 left-0 w-full h-4 bg-purple-800 rounded-t-lg"></div>
                        <div className="relative mb-4 text-purple-800">
                            <FaCalendar className="text-5xl" />
                        </div>
                        <h2 className="text-xl font-bold mb-4 text-purple-800">Events🎉</h2>
                        <p className="text-gray-600 dark:text-black-300 font-bold">Coordinate party events seamlessly with our Events feature.</p>
                    </li>
                    <li className="bg-white border border-solid border-purple-800 dark:border-white rounded-lg shadow-xl p-6 transition-transform transform hover:scale-105">
                        <div className="absolute top-0 left-0 w-full h-4 bg-purple-800 rounded-t-lg"></div>
                        <div className="mb-4 text-purple-800">
                            <FaRoute className="text-5xl" />
                        </div>
                        <h2 className="text-xl font-bold mb-4 text-purple-800">Route🗺️</h2>
                        <p className="text-gray-600 dark:text-black-300 font-bold">Guide your guests to the party hassle-free with our Route planner.</p>
                    </li>
                    <li className="bg-white border border-solid border-purple-800 dark:border-white rounded-lg shadow-xl p-6 transition-transform transform hover:scale-105">
                        <div className="absolute top-0 left-0 w-full h-4 bg-purple-800 rounded-t-lg"></div>
                        <div className="mb-4 text-purple-800">
                            <FaUser className="text-5xl" />
                        </div>
                        <h2 className="text-xl font-bold mb-4 text-purple-800">Contacts👫</h2>
                        <p className="text-gray-600 dark:text-black-300 font-bold">Stay connected with your party crew using our Contacts organizer.</p>
                    </li>
                </ul>
            </section>
            <SignIn isOpen={isSignInModalOpen} onClose={() => closeSignInModal(setIsSignInModalOpen)} switchModals={openSignUpModal} />
            <SignUp isOpen={isSignUpModalOpen} onClose={() => closeSignUpModal(setIsSignUpModalOpen)} switchModals={openSignInModal} />
            
            <section id='mock-calendar' className='mb-20 pb-20'>
                <MonthCalendarLandingPage openSignInModal={openSignInModal} setIsSignInModalOpen={setIsSignInModalOpen} />
            </section>
            <section id='made-by' className="bg-gradient-iridescent py-20 px-6 text-center dark:bg-neutral-900">
                <h2 className="text-4xl font-bold mb-6 text-white">Our team:</h2>
                <div className="flex justify-center items-center">
                    <div className="mr-10">
                        <img src={Miroslav} alt="Miroslav Dimitrov" className="w-32 h-32 rounded-full mb-2" />
                        <p className="text-white">Miroslav Dimitrov</p>
                    </div>
                    <div className="mx-10">
                        <img src={Denitsa} alt="Denitsa Georgieva" className="w-32 h-32 rounded-full mb-2" />
                        <p className="text-white">Denitsa Georgieva</p>
                    </div>
                    <div className="ml-10">
                        <img src={Nikola} alt="Nikola Ninov" className="w-32 h-32 rounded-full mb-2" />
                        <p className="text-white">Nikola Ninov</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
