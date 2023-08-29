import { FaUser } from "react-icons/fa";
import { useData } from "../../../contexts/DataContext";
import { useEffect, useState } from "react";
import { acceptContactRequest, rejectContactRequest } from "../../../services/contacts.service";
import { getUserContacts } from "../../../services/user.service";
import { useAuth } from "../../../contexts/AuthContext";

const PendingInvites = () => {
    const { users, pendingInvites, setPendingInvites, setUserContacts, setUserContactsData, setPendingInvitesData } = useData();
    const [showInvites, setShowInvites] = useState(false);
    const { userData } = useAuth();

    const pendingInvitesForCurrentUser = pendingInvites?.filter(invite => invite.receiverId === userData?.uid);


    const rejectInvite = async (invite) => {
        try {
            const success = await rejectContactRequest(invite.id);
            if (success) {
                const updatedPendingInvites = pendingInvites?.filter(item => item.uid !== invite.id);
                setPendingInvites(updatedPendingInvites);
                await setPendingInvitesData();
            }
        } catch (error) {
            console.error('Error rejecting invite:', error);
        }
    }
    const acceptInvite = async (invite) => {
        try {
            await acceptContactRequest(invite.id, userData?.uid, invite.senderId);
            const updatedUserContacts = await getUserContacts(userData?.uid);
            setUserContacts(updatedUserContacts);
            const updatedPendingInvites = pendingInvites.filter(item => item.uid !== invite.id);
            setPendingInvites(updatedPendingInvites);
            await setPendingInvitesData();
            await setUserContactsData();
        } catch (error) {
            console.error('Error accepting invite:', error);
        }
    }

    useEffect(() => {
        if (pendingInvites?.length > 0) {
            setShowInvites(true);
        } else {
            setShowInvites(false);
        }
    }, [pendingInvites]);


    return (
        <div>
             {showInvites && (
                <div>
                    <h3 className="text-lg font-semibold mb-2">Pending Invites</h3>
                    {pendingInvitesForCurrentUser.map(invite => {
                        const senderUser = users.find(user => user.uid === invite.senderId);

                        return (
                            <div key={invite.id} className="flex items-center justify-between bg-gray-200 p-2 rounded mb-2">
                                <div className="flex items-center space-x-2">
                                    {senderUser?.photo ? (
                                        <img src={senderUser?.photo} alt={`${senderUser?.username} Avatar`} className="w-10 h-10 rounded-full mr-10" />
                                    ) : (
                                        <div className="w-10 h-10 bg-purple-800 rounded-full mr-10 flex items-center justify-center">
                                            <FaUser size={20} color="white" />
                                        </div>
                                    )}
                                    <span className="text-lg font-semibold">{senderUser ? senderUser.username : 'Unknown User'}</span>
                                </div>
                                <div>    
                                    <button className="text-green-500 mr-2" onClick={() => acceptInvite(invite)}>Accept</button>
                                    <button className="text-red-500" onClick={() => rejectInvite(invite)}>Reject</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    )
}

export default PendingInvites;