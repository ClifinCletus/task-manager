"use client";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";


export function useAuth() {
    const dispatch = useDispatch();
    const { user, loading, error, isAuthReady } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
    };

    return {
        user,
        loading,
        error,
        isAuthReady,
        isAuthenticated: !!user,
        logout: handleLogout
    };
}
