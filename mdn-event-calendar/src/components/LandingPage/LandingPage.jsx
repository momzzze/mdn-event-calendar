import { useState } from 'react';
import './LandingPage.css'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import SignIn from '../Auth/Login/Signin';
import SignUp from '../Auth/Register/Signup';
import { closeSignInModal, closeSignUpModal } from '../../common/auth.helper.functions';
import Calendar from '../Calendar/Calendar';
import MonthCalendarLandingPage from '../Calendar/Month/MonthCalendarLandingPage';


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
        <section className="mb-40">
            <nav
                className="relative flex w-full items-center justify-between bg-white py-2 shadow-none lg:flex-wrap lg:justify-start"
                data-te-navbar-ref>
                <div className="flex w-full flex-wrap items-center justify-between px-6">
                    <div className="flex items-center">
                        <span className="[&>svg]:ml-2 [&>svg]:mr-3 [&>svg]:h-6 [&>svg]:w-6 [&>svg]:lg:ml-0">
                            LOGO HERE
                        </span>
                    </div>
                    <RouterLink
                        className="mb-2 inline-block rounded bg-primary px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal transition duration-150 ease-in-out hover:bg-gradient-iridescent focus:outline-none focus:ring-0 active:bg-primary-700 dark:hover:shadow-none md:mr-2 md:mb-0 custom-link-hover-nav"
                        data-te-ripple-init data-te-ripple-color="light" onClick={() => openSignInModal(setIsSignInModalOpen)} role="button"
                        style={{ color: 'black' }}>
                        Sign In
                    </RouterLink>
                </div>
            </nav>
            <div className="bg-gradient-iridescent py-24 px-6 text-center dark:bg-neutral-900">
                <h1 className="mt-2 mb-16 text-5xl font-bold tracking-tight text-whiteh1 md:text-6xl xl:text-7xl">
                    The best calendar app <br /><span className="text-primary">for music events in the web</span>
                </h1>
                <RouterLink
                    className="mb-2 inline-block rounded bg-white px-16 py-4 text-sm font-extrabold uppercase leading-normal transition duration-150 ease-in-out hover:bg-gradient-iridescent focus:outline-none focus:ring-0 active:bg-primary-700 dark:hover:shadow-none md:mr-2 md:mb-0 custom-link-hover"
                    data-te-ripple-init data-te-ripple-color="light" onClick={() => openSignUpModal(setIsSignUpModalOpen)} role="button">
                    Get started
                </RouterLink>
            </div>
            <SignIn isOpen={isSignInModalOpen} onClose={() => closeSignInModal(setIsSignInModalOpen)} switchModals={openSignUpModal} />
            <SignUp isOpen={isSignUpModalOpen} onClose={() => closeSignUpModal(setIsSignUpModalOpen)} switchModals={openSignInModal} />
            <MonthCalendarLandingPage />
        </section >
    )
}
export default LandingPage;