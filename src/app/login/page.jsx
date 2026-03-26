"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "@/redux/slices/authSlice";
import Link from "next/link";
import styles from "../auth.module.css";

export default function Login() {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
    };

    return (
        <main className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Welcome Back</h1>
                    <p className={styles.subtitle}>Enter your details to sign in.</p>
                </div>

                <form className={styles.form} onSubmit={handleLogin}>
                    {error && <div className={styles.error}>{error}</div>}

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="email">Email address</label>
                        <input
                            id="email"
                            className={styles.input}
                            type="email"
                            placeholder="name@company.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="password">Password</label>
                        <div className={styles.inputWrapper}>
                            <input
                                id="password"
                                className={styles.input}
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className={styles.toggleButton}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <button className={styles.button} type="submit" disabled={loading}>
                        {loading ? "Signing you in..." : "Sign In"}
                    </button>
                </form>

                <footer className={styles.footer}>
                    Not a member yet?
                    <Link href="/signup" className={styles.link}>Create account</Link>
                </footer>
            </div>
        </main>
    );
}