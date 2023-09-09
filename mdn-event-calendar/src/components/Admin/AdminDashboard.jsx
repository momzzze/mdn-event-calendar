import AdminEventsDashboard from "./AdminEventsDashboard";
import AdminUsersDashboard from "./AdminUsersDashBoard";



const AdminDashboard = () => {


    return (
        <section className='mb-24'>
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
