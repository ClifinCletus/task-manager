"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProtectedRoute from "@/components/protectedRoutes";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import { createTask, fetchTasks, updateTask, deleteTask } from "@/redux/slices/taskSlice";
import styles from "./page.module.css";

export default function Home() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { tasks, loading: taskLoading } = useSelector((state) => state.tasks);

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    // Initial Fetch of tasks
    useEffect(() => {
        if (user) {
            dispatch(fetchTasks());
        }
    }, [dispatch, user]);

    const handleFormSubmit = async (taskData) => {
        if (editingTask) {
            // Update existing task
            const result = await dispatch(updateTask({ id: editingTask.id, taskData }));
            if (updateTask.fulfilled.match(result)) {
                setIsFormVisible(false);
                setEditingTask(null);
            }
        } else {
            // Create new task
            const result = await dispatch(createTask(taskData));
            if (createTask.fulfilled.match(result)) {
                setIsFormVisible(false);
            }
        }
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
        setIsFormVisible(true);
    };

    const handleDeleteTask = (id) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            dispatch(deleteTask(id));
        }
    };

    const handleCancel = () => {
        setIsFormVisible(false);
        setEditingTask(null);
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
                            {isFormVisible ? (editingTask ? "Refine your milestone" : "Structure your next move") : "Ready to flow?"}
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
                                onClick={handleCancel}
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
                                    <span className={styles.statLabel}>Active Focus</span>
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
                            onSubmit={handleFormSubmit}
                            loading={taskLoading}
                            initialData={editingTask}
                        />
                    </section>
                )}
            </main>
        </ProtectedRoute>
    );
}
