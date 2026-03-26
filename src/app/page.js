"use client";

import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "@/redux/slices/authSlice";

export default function Home() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    if (!user) return null; // Redirection is handled in Providers

    return (
        <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
            <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <h1>Dashboard</h1>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <span style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
                        {user.email}
                    </span>
                    <button
                        onClick={handleLogout}
                        style={{
                            padding: "0.5rem 1rem",
                            backgroundColor: "#ef4444",
                            color: "white",
                            borderRadius: "var(--radius)",
                            fontWeight: "600",
                            fontSize: "0.875rem"
                        }}
                    >
                        Logout
                    </button>
                </div>
            </header>

            <div style={{
                padding: "2rem",
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                boxShadow: "var(--shadow-md)"
            }}>
                <h2 style={{ marginBottom: "1rem" }}>Welcome, {user.email.split('@')[0]}!</h2>
                <p style={{ color: "var(--muted-foreground)" }}>
                    You have successfully signed in. Your session is now active.
                </p>
            </div>
        </main>
    );
}
