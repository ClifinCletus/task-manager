"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signupUser } from "@/redux/slices/authSlice";
import Link from "next/link";
import styles from "../auth.module.css";

export default function Signup() {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSignup = (e) => {
        e.preventDefault();
        dispatch(signupUser({ email, password }));
    };

    return (
        <main className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Create Account</h1>
                    <p className={styles.subtitle}>Start organizing your work today.</p>
                </div>

                <form className={styles.form} onSubmit={handleSignup}>
                    {error && <div className={styles.error}>{error}</div>}

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="email">Work Email</label>
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
                                placeholder="Min. 6 characters"
                                required
                                minLength={6}
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
                        {loading ? "Creating your account..." : "Get Started"}
                    </button>
                </form>

                <footer className={styles.footer}>
                    Already have an account?
                    <Link href="/login" className={styles.link}>Sign In</Link>
                </footer>
            </div>
        </main>
    );
}