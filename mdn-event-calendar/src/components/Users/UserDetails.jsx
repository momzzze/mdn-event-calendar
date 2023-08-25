import Modal from "react-modal";
import { userProfileStyles } from "../../common/modal.helper.functions";
import { useEffect } from "react";

const UserDetails = ({ isOpen, onClose,data }) => {
    useEffect(() => {
    }, [data]);
    return (
        <>
            <Modal
                isOpen={isOpen} onRequestClose={onClose}
                style={userProfileStyles}
                contentLabel="User Details Modal"
            >
                <div className="flex flex-col items-center justify-center h-full">
                    <img
                        src="https://source.unsplash.com/100x100/?portrait?1"
                        alt=""
                        className="object-cover object-center w-32 h-32 rounded dark:bg-gray-500"
                    />
                    <div className="text-center mt-4">
                        <h2 className="text-2xl font-semibold">Leroy Jenkins</h2>
                        <span className="text-sm dark:text-gray-400">General manager</span>
                    </div>
                    <div className="text-center mt-4 space-y-1">
                        <span className="flex items-center justify-center space-x-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                aria-label="Email address"
                                className="w-4 h-4"
                            >
                            </svg>
                            <span className="dark:text-gray-400">leroy.jenkins@company.com</span>
                        </span>
                        <span className="flex items-center justify-center space-x-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                aria-label="Phonenumber"
                                className="w-4 h-4"
                            >
                            </svg>
                            <span className="dark:text-gray-400">+25 381 77 983</span>
                        </span>
                    </div>
                </div>
            </Modal>
        </>
    )
}
export default UserDetails;