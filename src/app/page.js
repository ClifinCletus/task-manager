"use client";

import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProtectedRoute from "@/components/protectedRoutes";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import TaskFilters from "@/components/TaskFilters";
import { createTask, fetchTasks, updateTask, deleteTask } from "@/redux/slices/taskSlice";
import { FiPlus, FiX } from "react-icons/fi";
import styles from "./page.module.css";

export default function Home() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { tasks, loading: taskLoading } = useSelector((state) => state.tasks);

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    // Filter and Sort State
    const [filters, setFilters] = useState({
        search: "",
        status: "",
        urgency: "",
        tag: "",
        sort: "newest"
    });

    // Initial Fetch of tasks
    useEffect(() => {
        if (user) {
            dispatch(fetchTasks());
        }
    }, [dispatch, user]);

    // Derived State: Filtering and Sorting Logic
    const filteredTasks = useMemo(() => {
        let result = [...tasks];

        // 1. Search Filter
        if (filters.search.trim()) {
            const query = filters.search.toLowerCase();
            result = result.filter(t =>
                t.title.toLowerCase().includes(query) ||
                (t.description && t.description.toLowerCase().includes(query))
            );
        }

        // 2. Status Filter
        if (filters.status) {
            result = result.filter(t => t.status === filters.status);
        }

        // 3. Urgency Filter
        if (filters.urgency) {
            result = result.filter(t => t.urgency === filters.urgency);
        }

        // 4. Tag Filter
        if (filters.tag) {
            result = result.filter(t => t.tags && t.tags.includes(filters.tag));
        }

        // 5. Sorting Logic
        result.sort((a, b) => {
            if (filters.sort === "newest") {
                return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
            }
            if (filters.sort === "oldest") {
                return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
            }
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
        if (editingTask) {
            const result = await dispatch(updateTask({ id: editingTask.id, taskData }));
            if (updateTask.fulfilled.match(result)) {
                setIsFormVisible(false);
                setEditingTask(null);
            }
        } else {
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
                                <FiPlus style={{ marginRight: '8px' }} />
                                New Task
                            </button>
                        ) : (
                            <button
                                onClick={handleCancel}
                                className={styles.cancelBtn}
                            >
                                <FiX style={{ marginRight: '8px' }} />
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

                        {/* Search and Filters Section */}
                        <section className={styles.listSection}>
                            <TaskFilters filters={filters} setFilters={setFilters} />

                            <TaskList
                                tasks={filteredTasks}
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
