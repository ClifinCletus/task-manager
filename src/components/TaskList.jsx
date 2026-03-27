"use client";

import styles from "./TaskList.module.css";
import TaskCard from "./TaskCard";

export default function TaskList({ tasks = [], onEdit, onDelete, onStatusChange }) {
    if (!tasks || tasks.length === 0) {
        return (
            <div className={styles.emptyState}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "800", color: "var(--foreground)" }}>No activities found</h3>
                <p>Track your flow by creating your first task above.</p>
            </div>
        );
    }

    return (
        <div className={styles.grid}>
            {tasks.map((task) => (
                <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onStatusChange={onStatusChange}
                />
            ))}
        </div>
    );
}
