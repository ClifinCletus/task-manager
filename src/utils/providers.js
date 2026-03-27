"use client";

import { Provider, useDispatch } from "react-redux";
import { store } from "@/redux/store";
import { useEffect } from "react";
import { auth } from "@/services/firebase";
import { useRouter, usePathname } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { setUser } from "@/redux/slices/authSlice";

function AuthWrapper({ children }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(setUser({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                }));
                
                if (pathname === "/login" || pathname === "/signup") {
                    router.push("/");
                }
            } else {
                dispatch(setUser(null));
                if (pathname !== "/login" && pathname !== "/signup") {
                    router.push("/login");
                }
            }
        });

        return () => unsubscribe();
    }, [dispatch, router, pathname]);

    return <>{children}</>;
}

export function Providers({ children }) {
    return (
        <Provider store={store}>
            <AuthWrapper>{children}</AuthWrapper>
        </Provider>
    );
}