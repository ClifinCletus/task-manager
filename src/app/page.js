"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProtectedRoute from "@/components/protectedRoutes";
import TaskForm from "@/components/TaskForm";
import { createTask } from "@/redux/slices/taskSlice";
import styles from "./page.module.css";

export default function Home() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { tasks, loading: taskLoading } = useSelector((state) => state.tasks);

    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleCreateTask = async (taskData) => {
        const result = await dispatch(createTask(taskData));
        if (createTask.fulfilled.match(result)) {
            setIsFormVisible(false);
        }
    };

    if (!user) return null;

    return (
        <ProtectedRoute>
            <main className={styles.container}>
                {/* Header Section */}
                <header className={styles.dashboardHeader}>
                    <div className={styles.welcomeSection}>
                        <h2 className={styles.welcomeTitle}>
                            Good day, {user.email.split('@')[0]}
                        </h2>
                        <p className={styles.welcomeSubtitle}>
                            {isFormVisible ? "Fill in the details to add a task" : "Overview of your current workspace"}
                        </p>
                    </div>

                    <div className={styles.controls}>
                        {!isFormVisible ? (
                            <button
                                onClick={() => setIsFormVisible(true)}
                                className={styles.createBtn}
                            >
                                + New Task
                            </button>
                        ) : (
                            <button
                                onClick={() => setIsFormVisible(false)}
                                className={styles.cancelBtn}
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </header>

                {/* Main Content Area */}
                {!isFormVisible ? (
                    <section className={styles.statsGrid}>
                        <div className={styles.statCard}>
                            <span className={styles.statLabel}>Active Projects</span>
                            <div className={styles.statValue}>{tasks.length}</div>
                        </div>
                        <div className={styles.statCard}>
                            <span className={styles.statLabel}>Completed Tasks</span>
                            <div className={`${styles.statValue} ${styles.statValueAlt}`}>
                                {tasks.filter(t => t.status === "Done").length}
                            </div>
                        </div>
                    </section>
                ) : (
                    <section className={styles.formSection}>
                        <TaskForm
                            onSubmit={handleCreateTask}
                            loading={taskLoading}
                        />
                    </section>
                )}
            </main>
        </ProtectedRoute>
    );
}
