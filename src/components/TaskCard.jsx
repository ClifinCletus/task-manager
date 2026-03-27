"use client";

import { FiEdit2, FiTrash2, FiCalendar, FiClock } from "react-icons/fi";
import styles from "./TaskCard.module.css";
import StatusBadge from "./StatusBadge";

export default function TaskCard({ task, onEdit, onDelete }) {

    // Formatting Firestore date string
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        return new Date(dateStr).toLocaleDateString();
    };

    const getUrgencyClass = (urgency) => {
        switch (urgency) {
            case "High": return styles.high;
            case "Medium": return styles.medium;
            case "Low": return styles.low;
            default: return "";
        }
    };

    return (
        <article className={styles.card}>
            <header className={styles.header}>
                <div className={styles.topInfo}>
                    <StatusBadge status={task.status} />
                    {task.createdAt && (
                        <span className={styles.date}>
                            <FiClock style={{ marginBottom: '-2px', marginRight: '4px' }} />
                            {formatDate(task.createdAt)}
                        </span>
                    )}
                </div>
                <div className={`${styles.urgencyDot} ${getUrgencyClass(task.urgency)}`} title={`Urgency: ${task.urgency}`}></div>
            </header>

            <div className={styles.content}>
                <h3 className={styles.title}>{task.title}</h3>
                <p className={styles.description}>
                    {task.description || "No description provided."}
                </p>

                {task.tags && task.tags.length > 0 && (
                    <div className={styles.tagGroup}>
                        {task.tags.map((tag, idx) => (
                            <span key={idx} className={styles.tag}>#{tag}</span>
                        ))}
                    </div>
                )}
            </div>

            <footer className={styles.footer}>
                {task.deadline && (
                    <span className={styles.deadline}>
                        <FiCalendar style={{ marginBottom: '-2px', marginRight: '4px' }} />
                        {formatDate(task.deadline)}
                    </span>
                )}
                <div className={styles.actionGroup}>
                    <button
                        onClick={() => onEdit(task)}
                        className={`${styles.actionBtn} ${styles.editBtn}`}
                        aria-label="Edit task"
                    >
                        <FiEdit2 size={14} />
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className={`${styles.actionBtn} ${styles.deleteBtn}`}
                        aria-label="Delete task"
                    >
                        <FiTrash2 size={14} />
                    </button>
                </div>
            </footer>
        </article>
    );
}
