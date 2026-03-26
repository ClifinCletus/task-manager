"use client";

import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "@/redux/slices/authSlice";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    if (!user) return null;

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.logoArea}>
                    <Link href="/" className={styles.logo}>
                        ProTask
                    </Link>
                </div>

                <div className={styles.userArea}>
                    <div className={styles.userInfo}>
                        <span className={styles.userName}>
                            {user.email.split('@')[0]}
                        </span>
                        <span className={styles.userEmail}>
                            {user.email}
                        </span>
                    </div>
                    <button onClick={handleLogout} className={styles.logoutBtn}>
                        Logout
                    </button>
                </div>
            </nav>
        </header>
    );
}
