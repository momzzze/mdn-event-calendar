import AdminEventsDashboard from "./AdminEventsDashboard";
import AdminUsersDashboard from "./AdminUsersDashBoard";



const AdminDashboard = () => {


    return (
        <section className='mb-24'>
            <div className="bg-purple-800 text-white py-2 px-4 ml-16 mr-16 mt-4 mb-4">
                <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
            </div>
            <div className="w-90% ml-16 mr-16 mt-4 border-double border-4 border-gray-300 shadow-lg">

                <AdminUsersDashboard />
            </div >
            <div className="w-90% ml-16 mr-16 mt-4 border-double border-4 border-gray-300 shadow-lg">
                <AdminEventsDashboard />
            </div>
        </section>
    );
};
export default AdminDashboard;
