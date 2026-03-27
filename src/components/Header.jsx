"use client";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { FiLogOut, FiUser } from "react-icons/fi";
import styles from "./Header.module.css";

export default function Header() {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await dispatch(logout());
            router.push("/login");
        } catch (error) {
            console.error("Logout failed:", error.message);
        }
    };

    if (!user) return null;

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <h1 className={styles.logo}>TaskFlow</h1>

                <div className={styles.userSection}>
                    <div className={styles.userInfo}>
                        <FiUser className={styles.userIcon} />
                        <span className={styles.email}>{user.email}</span>
                    </div>
                    <button onClick={handleLogout} className={styles.logoutBtn}>
                        <FiLogOut size={16} />
                        <span>Logout</span>
                    </button>
                </div>
            </nav>
        </header>
    );
}
