"use client";

import styles from "./TaskCard.module.css";
import StatusBadge from "./StatusBadge";

export default function TaskCard({ task, onEdit, onDelete }) {

    // Simple SVG Icons for standard Noir UI
    const EditIcon = () => (
        <svg viewBox="0 0 24 24" className={styles.icon} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
    );

    const TrashIcon = () => (
        <svg viewBox="0 0 24 24" className={styles.icon} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
    );

    return (
        <article className={styles.card}>
            <header className={styles.header}>
                <h3 className={styles.title}>{task.title}</h3>
                <StatusBadge status={task.status} />
            </header>

            <p className={styles.description}>
                {task.description || "No description provided."}
            </p>

            <footer className={styles.footer}>
                <button
                    onClick={() => onEdit(task)}
                    className={`${styles.actionBtn} ${styles.editBtn}`}
                    aria-label="Edit task"
                >
                    <EditIcon />
                </button>
                <button
                    onClick={() => onDelete(task.id)}
                    className={`${styles.actionBtn} ${styles.deleteBtn}`}
                    aria-label="Delete task"
                >
                    <TrashIcon />
                </button>
            </footer>
        </article>
    );
}
