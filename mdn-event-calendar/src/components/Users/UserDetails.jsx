import Modal from "react-modal";
import { useAuth } from "../../contexts/AuthContext";
import { customStylesSignUp } from "../../common/modal.helper.functions";

// const customStyles = {
//     content: {
//       top: "50%",
//       left: "50%",
//       transform: "translate(-50%, -50%)",
//       width: "40rem",
//       height: "37rem",
//       padding: "20px",
//       borderRadius: "8px",
//       boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
//     },
//   };

const UserDetails = ({ isOpen, onClose, username }) => {
    const { userData } = useAuth();
    
    if (!isOpen || userData === null) {
        return null;
    }
    
    const contacts = (userData?.contacts && Object.keys(userData.contacts).length) || 0;
   
    return (
        <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={customStylesSignUp}
        contentLabel="User Details Modal"
      >
        <div className="my-4 justify-center">
          <h1 className="text-3xl text-center font-semibold text-white">
            {userData?.username}
          </h1>
        </div>
        <div className="flex flex-col items-center mx-8">
          <div className="flex flex-row items-center justify-around border-2 border-white rounded-sm w-full py-4 px-4 mb-2">
            <img
              src={userData?.photo}
              alt="avatar"
              className="object-cover object-center w-32 h-32 rounded dark:bg-gray-500"
            />
            <div className="flex flex-col items-center justify-around h-full">
              <h2 className="mt-4 text-2xl font-semibold">
                {userData?.firstName + " " + userData?.lastName}
              </h2>
              <h3 className="text-xl font-semibold">{userData?.role}</h3>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center border-2 border-white rounded-sm w-full py-4 px-10 mb-2 font-semibold">
            <div className="flex flex-row justify-around w-full mb-2 border-b border-purple-800">
              <span className="flex-1">email:</span>
              <span className="dark:text-gray-400">{userData?.email}</span>
            </div>
            <div className="flex flex-row justify-around w-full mb-2 border-b border-purple-800">
              <span className="flex-1">phone:</span>
              <span className="dark:text-gray-400">{userData?.phone}</span>
            </div>
            <div className="flex flex-row justify-around w-full mb-2 border-b border-purple-800">
              <span className="flex-1">country:</span>
              <span className="dark:text-gray-400 text-black">{userData?.country}</span>
            </div>
            <div className="flex flex-row justify-around w-full mb-2 border-b border-purple-800">
              <span className="flex-1">city:</span>
              <span className="dark:text-gray-400">{userData?.city}</span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center border-2 border-white rounded-sm w-full py-4 px-10 mb-4 font-semibold">
            <div className="flex flex-row justify-around w-full mb-2 border-b border-purple-800">
              <span className="flex-1">contacts:</span>
              <span className="dark:text-gray-400">{contacts}</span>
            </div>
          </div>
        </div>
      </Modal>
    </>
    )
}
export default UserDetails;