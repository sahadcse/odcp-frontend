"use client";
import withAuth from "@/common/WithAuth";
import AdminLayout from "@/components/Admin/AdminLayout";

const AdminDashboard = () => {
    return (
        <AdminLayout>
            <h2 className="text-2xl font-semibold mb-5">Welcome to the Admin Dashboard</h2>
        </AdminLayout>
    );
};

export default withAuth(AdminDashboard,['admin']);
