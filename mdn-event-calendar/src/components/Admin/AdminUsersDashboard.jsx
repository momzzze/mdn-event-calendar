import { useState } from "react";
import { useData } from "../../contexts/DataContext";
import { handleToggleRole } from "../../services/user.service";
import { FaUser } from 'react-icons/fa';
const AdminUsersDashboard = () => {
    const { users, setUsersData } = useData();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const handleToggle = async (userId, currentRole) => {
        const newRole = currentRole === 'user' ? 'banned' : 'user';
        await handleToggleRole(userId, newRole);
        const updatedUsers = users.map(user => {
            if (user.id === userId) {
                return { ...user, role: newRole };
            }
            return user;
        });
        setUsersData(updatedUsers);
    };
    const bannedUsers = users ? users.filter(user => user.role === 'banned') : [];

    const filteredUsers = users
        ? users.filter((user) =>
            user.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
            user.role !== 'admin'
        )
        : [];
    return (
        <div className="grid grid-cols-3 gap-4 ">
            <div className="col-span-2 pr-4 overflow-hidden">
                <div className="bg-purple-800 text-white py-2 px-4 rounded-md mb-4 mt-4 ml-4">
                    <h1 className="text-3xl font-semibold">Users</h1>
                </div>
                <div className="max-h-1/2-screen overflow-y-auto">
                    <div className="col-span-2 pr-4 overflow-hidden">
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="border border-gray-300 w-4/5 min-w-0 max-w-full px-3 py-2 rounded focus:outline-none focus:border-purple-500"
                            />
                        </div>
                    </div>
                    {users ? (
                        <ul className="flex flex-col items-center h-1/3 mb-6 max-h-96 overflow-y-auto">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <li key={user?.id} className="bg-white rounded-lg p-4 w-2/3 flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-2 justify-center">
                                            {user.photo ? (
                                                <img src={user.photo} alt={`${user?.username} Avatar`} className="w-10 h-10 rounded-full mr-10" />
                                            ) : (
                                                <div className="w-10 h-10 bg-purple-800 rounded-full mr-10 flex items-center justify-center">
                                                    <FaUser size={20} color="white" />
                                                </div>
                                            )}
                                            <span className="text-lg font-semibold">{user.username}</span>
                                        </div>
                                        <button
                                            onClick={() => handleToggle(user?.id, user?.role)}
                                            className={`px-4 py-2 mt-2 rounded focus:outline-none text-white ${user?.role === 'user' ? 'bg-red-500' : 'bg-green-500'
                                                } hover:${user?.role === 'user' ? 'bg-red-700' : 'bg-green-700'}`}
                                        >
                                            {user?.role === 'user' ? 'ban' : 'unban'}
                                        </button>
                                    </li>
                                ))
                            ) : (
                                <p>No users found.</p>
                            )}
                        </ul>
                    ) : (
                        <p>Loading users...</p>
                    )}
                </div>
            </div>
            <div className="col-span-1 pl-4 border-l border-gray-300 overflow-hidden">
                <h2 className="mt-6 text-lg font-bold mb-2">Banned Users</h2>
                {bannedUsers.length > 0 ? (
                    <ul>
                        {bannedUsers.map(user => (
                            <li key={user?.id} className="bg-white rounded-lg p-4 flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-2">
                                    <img src={user?.photo} alt={`${user?.username} Avatar`} className="w-10 h-10 rounded-full mr-10" />
                                    <span className="text-lg font-semibold">{user.username}</span>
                                </div>
                                <button
                                    onClick={() => handleToggle(user?.id, user?.role)}
                                    className={`px-4 py-2 mt-2 rounded focus:outline-none text-white bg-green-500 hover:bg-green-700`}
                                >
                                    unban
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No banned users.</p>
                )}
            </div>
        </div>
    )
};

export default AdminUsersDashboard;