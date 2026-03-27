"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
    const { user, isAuthReady } = useSelector((state) => state.auth);
    const router = useRouter();

    useEffect(() => {
        if (isAuthReady && !user) {
            router.push("/login");
        }
    }, [user, isAuthReady, router]);

    if (!isAuthReady) {
        return (
            <div style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--background)'
            }}>
                {/* Standard simple pulse loader */}
                <div style={{
                    width: '40px',
                    height: '40px',
                    border: '3px solid var(--secondary)',
                    borderTop: '3px solid var(--foreground)',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }} />
                <style dangerouslySetInnerHTML={{
                    __html: `
                    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                 `}} />
            </div>
        );
    }

    if (!user) return null;

    return children;
}