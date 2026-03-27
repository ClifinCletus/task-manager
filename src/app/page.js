"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProtectedRoute from "@/components/protectedRoutes";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import { createTask, fetchTasks } from "@/redux/slices/taskSlice";
import styles from "./page.module.css";

export default function Home() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { tasks, loading: taskLoading } = useSelector((state) => state.tasks);

    const [isFormVisible, setIsFormVisible] = useState(false);

    // Initial Fetch of tasks
    useEffect(() => {
        if (user) {
            dispatch(fetchTasks());
        }
    }, [dispatch, user]);

    const handleCreateTask = async (taskData) => {
        const result = await dispatch(createTask(taskData));
        if (createTask.fulfilled.match(result)) {
            setIsFormVisible(false);
        }
    };

    const handleEditTask = (task) => {
        // Edit functionality placeholder
        console.log("Edit Task:", task);
    };

    const handleDeleteTask = (id) => {
        // Delete functionality placeholder
        console.log("Delete Task ID:", id);
    };

    if (!user) return null;

    return (
        <ProtectedRoute>
            <main className={styles.container}>
                {/* Header Section */}
                <header className={styles.dashboardHeader}>
                    <div className={styles.welcomeSection}>
                        <h2 className={styles.welcomeTitle}>
                            Hey, {user.email.split('@')[0]}
                        </h2>
                        <p className={styles.welcomeSubtitle}>
                            {isFormVisible ? "Structure your next move" : "Ready to flow?"}
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
                    <>
                        {/* Compact Stats Row */}
                        <section className={styles.statsGrid}>
                            <div className={styles.statCard}>
                                <div className={styles.statInfo}>
                                    <span className={styles.statLabel}>Active</span>
                                    <div className={styles.statValue}>{tasks.length}</div>
                                </div>
                            </div>
                            <div className={styles.statCard}>
                                <div className={styles.statInfo}>
                                    <span className={styles.statLabel}>Completed</span>
                                    <div className={`${styles.statValue} ${styles.statValueAlt}`}>
                                        {tasks.filter(t => t.status === "Done").length}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Responsive Task Grid */}
                        <section className={styles.listSection}>
                            <TaskList
                                tasks={tasks}
                                onEdit={handleEditTask}
                                onDelete={handleDeleteTask}
                            />
                        </section>
                    </>
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
