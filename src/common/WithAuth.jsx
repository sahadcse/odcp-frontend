'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useIsAuthenticated from "../hooks/useIsAuthenticated";
import useUserData from "@/hooks/useUserData";

export default function withAuth(Component, allowedRoles = []) {
    return function ProtectedPage(props) {
        const [loading, setLoading] = useState(true);
        const isAuthenticated = useIsAuthenticated();
        const userData = useUserData();
        const role = userData?.role || null;
        const router = useRouter();

        useEffect(() => {
            if (!isAuthenticated) {
                router.push('/login');
            } else if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
                router.push('/login');
            } else {
                setLoading(false);
            }
        }, [isAuthenticated, role, allowedRoles]);

        if (loading) {
            return <div className="flex justify-center items-center h-screen text-xl font-semibold">Loading...</div>;
        }

        return <Component {...props} />;
    };
}
