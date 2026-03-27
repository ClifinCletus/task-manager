"use client";

import { useState, useMemo } from "react";
import ProtectedRoute from "@/components/protectedRoutes";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import TaskFilters from "@/components/TaskFilters";
import { useAuth } from "@/hooks/useAuth";
import { useTasks } from "@/hooks/useTasks";
import { FiPlus, FiX } from "react-icons/fi";
import styles from "./page.module.css";

export default function Home() {
    const { user } = useAuth();
    const {
        tasks,
        loading: taskLoading,
        addTask,
        updateTask,
        deleteTask,
        togglePin
    } = useTasks(user?.uid);

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    
    const [filters, setFilters] = useState({
        search: "",
        status: "",
        urgency: "",
        tag: "",
        sort: "newest"
    });

    
    const filteredTasks = useMemo(() => {
        let result = [...tasks];

        if (filters.search.trim()) {
            const query = filters.search.toLowerCase();
            result = result.filter(t =>
                t.title.toLowerCase().includes(query) ||
                (t.description && t.description.toLowerCase().includes(query))
            );
        }

        if (filters.status) result = result.filter(t => t.status === filters.status);
        if (filters.urgency) result = result.filter(t => t.urgency === filters.urgency);
        if (filters.tag) result = result.filter(t => t.tags && t.tags.includes(filters.tag));

        result.sort((a, b) => {
            if (a.pinned && !b.pinned) return -1;
            if (!a.pinned && b.pinned) return 1;

            if (filters.sort === "newest") return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
            if (filters.sort === "oldest") return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
            if (filters.sort === "deadline") {
                const dateA = a.deadline ? new Date(a.deadline) : new Date(8640000000000000);
                const dateB = b.deadline ? new Date(b.deadline) : new Date(8640000000000000);
                return dateA - dateB;
            }
            return 0;
        });

        return result;
    }, [tasks, filters]);

    const handleFormSubmit = async (taskData) => {
        try {
            if (editingTask) {
                await updateTask(editingTask.id, taskData);
                setEditingTask(null);
            } else {
                await addTask(taskData);
            }
            setIsFormVisible(false);
        } catch (error) {
            // Error already handled by toast in hook
        }
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
        setIsFormVisible(true);
    };

    const handleCancel = () => {
        setIsFormVisible(false);
        setEditingTask(null);
    };

    if (!user) return null;

    return (
        <ProtectedRoute>
            <main className={styles.container}>
                <header className={styles.dashboardHeader}>
                    <div className={styles.welcomeSection}>
                        <h2 className={styles.welcomeTitle}>
                            Hey, {user.email.split('@')[0]}
                        </h2>
                        <p className={styles.welcomeSubtitle}>
                            {isFormVisible ? (editingTask ? "Refine your task" : "Structure your next task") : "Ready to task up?"}
                        </p>
                    </div>

                    <div className={styles.controls}>
                        {!isFormVisible ? (
                            <button onClick={() => setIsFormVisible(true)} className={styles.createBtn}>
                                <FiPlus style={{ marginRight: '8px' }} />
                                New Task
                            </button>
                        ) : (
                            <button onClick={handleCancel} className={styles.cancelBtn}>
                                <FiX style={{ marginRight: '8px' }} />
                                Cancel
                            </button>
                        )}
                    </div>
                </header>

                {!isFormVisible ? (
                    <>
                        <section className={styles.statsGrid}>
                            <div className={styles.statCard}>
                                <div className={styles.statInfo}>
                                    <span className={styles.statLabel}>Total Tasks</span>
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

                        <section className={styles.listSection}>
                            <TaskFilters filters={filters} setFilters={setFilters} />

                            <TaskList
                                tasks={filteredTasks}
                                onEdit={handleEditTask}
                                onDelete={deleteTask}
                                onStatusChange={(id, status) => updateTask(id, { status })}
                                onPinToggle={togglePin}
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
