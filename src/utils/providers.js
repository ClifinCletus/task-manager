"use client";
import { Provider, useDispatch } from "react-redux";
import { store } from "@/redux/store";
import { useEffect, useState, createContext, useContext } from "react";
import { auth } from "@/services/firebase";
import { useRouter, usePathname } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { setUser } from "@/redux/slices/authSlice";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('dark'); //default dark
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') ||
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

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
            <ThemeProvider>
                <AuthWrapper>{children}</AuthWrapper>
            </ThemeProvider>
        </Provider>
    );
}