"use client";

import { useSelector } from "react-redux";
import ProtectedRoute from "@/components/protectedRoutes";

export default function Home() {
    const { user } = useSelector((state) => state.auth);

    if (!user) return null;

    return (
        <ProtectedRoute>
            <main style={{ padding: "2rem", maxWidth: "1280px", margin: "0 auto" }}>
                <div style={{
                    padding: "2.5rem",
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    boxShadow: "var(--shadow-md)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem"
                }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                        <h2 style={{ fontSize: "1.5rem", fontWeight: "700" }}>
                            Welcome back, {user.email.split('@')[0]}!
                        </h2>
                        <p style={{ color: "var(--muted-foreground)", fontSize: "0.875rem" }}>
                            Here is what is happening with your tasks today.
                        </p>
                    </div>

                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                        gap: "1rem"
                    }}>
                        <div style={{
                            padding: "1.5rem",
                            background: "var(--background)",
                            borderRadius: "var(--radius)",
                            border: "1px solid var(--border)"
                        }}>
                            <span style={{ fontSize: "0.75rem", fontWeight: "600", color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Total Tasks</span>
                            <div style={{ fontSize: "1.5rem", fontWeight: "700", marginTop: "0.25rem" }}>0</div>
                        </div>
                        <div style={{
                            padding: "1.5rem",
                            background: "var(--background)",
                            borderRadius: "var(--radius)",
                            border: "1px solid var(--border)"
                        }}>
                            <span style={{ fontSize: "0.75rem", fontWeight: "600", color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Completed</span>
                            <div style={{ fontSize: "1.5rem", fontWeight: "700", marginTop: "0.25rem", color: "#10b981" }}>0</div>
                        </div>
                    </div>
                </div>
            </main>
        </ProtectedRoute>
    );
}
