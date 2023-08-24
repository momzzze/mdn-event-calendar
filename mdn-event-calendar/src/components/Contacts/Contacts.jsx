
const Contacts = () => {
    const dummyUsers = [
        { id: 1, name: 'John Doe', avatar: 'https://images.pexels.com/photos/810775/pexels-photo-810775.jpeg' },
        { id: 2, name: 'Jane Smith', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 3, name: 'Alex Johnson', avatar: 'https://images.pexels.com/photos/1906157/pexels-photo-1906157.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        // Add more users as needed
    ];

    return (
        <div className="flex h-screen bg-gray-100  border-2 ">
            <div className="w-2/3 bg-white p-4 shadow-md">
                <input type="text" placeholder="Search users" className="w-full px-3 py-2 mb-4 border rounded" />
                <h2 className="text-xl font-semibold mb-2">Users</h2>
                <div className="grid place-items-center w-70% max-h-96 overflow-y-auto"> 
                    <ul className="w-3/4">
                        {dummyUsers.map(user => (
                            <li key={user.id} className="bg-white rounded-lg p-4 flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-2">
                                    <img src={user.avatar} alt={`${user.name} Avatar`} className="w-10 h-10 rounded-full mr-10" />
                                    <span className="text-lg font-semibold">{user.name}</span>
                                </div>
                                <button className="px-4 py-2 bg-purple-800 hover:bg-purple-300 text-white rounded">
                                    Add to Contacts
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="w-1/3 bg-white p-4 shadow-md">
                <h2 className="text-xl font-semibold mb-4">Contact Lists</h2>
                <select className="w-full px-3 py-2 mb-4 rounded border">
                    <option value="" disabled>Select a Contact List</option>
                    <option value="list1">Contact List 1</option>
                    <option value="list2">Contact List 2</option>
                </select>
                <div className="flex flex-col">
                    <button className="mx-auto mb-2 w-4/5 px-4 py-2 bg-purple-800 hover:bg-purple-300 text-white rounded">
                        Add List
                    </button>
                    <button className="mx-auto mb-2 w-4/5 px-4 py-2 bg-purple-800 hover:bg-purple-300 text-white rounded">
                        Add Contact
                    </button>
                    <button className="mx-auto mb-2 w-4/5 px-4 py-2 bg-purple-800 hover:bg-purple-300 text-white rounded">
                        Invites
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Contacts;