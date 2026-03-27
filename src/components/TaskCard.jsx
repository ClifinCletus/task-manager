"use client";

import { FiEdit2, FiTrash2, FiCalendar, FiClock, FiCheckCircle } from "react-icons/fi";
import styles from "./TaskCard.module.css";
import StatusBadge from "./StatusBadge";

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {

   
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        return new Date(dateStr).toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const getUrgencyClass = (urgency) => {
        switch (urgency) {
            case "High": return styles.high;
            case "Medium": return styles.medium;
            case "Low": return styles.low;
            default: return "";
        }
    };

    const handleComplete = () => {
        const nextStatus = task.status === "Done" ? "Todo" : "Done";
        onStatusChange(task.id, nextStatus);
    };

    return (
        <article className={`${styles.card} ${task.status === "Done" ? styles.cardDone : ""}`}>
            <header className={styles.header}>
                <div className={styles.topInfo}>
                    <button
                        onClick={handleComplete}
                        className={`${styles.statusToggle} ${task.status === "Done" ? styles.toggleDone : ""}`}
                        title={task.status === "Done" ? "Mark as Todo" : "Mark as Done"}
                    >
                        {task.status === "Done" ? <FiCheckCircle size={18} /> : <div className={styles.circle} />}
                    </button>
                    <StatusBadge status={task.status} />
                </div>
                <div className={`${styles.urgencyDot} ${getUrgencyClass(task.urgency)}`} title={`Urgency: ${task.urgency}`}></div>
            </header>

            <div className={styles.content}>
                <h3 className={styles.title}>{task.title}</h3>
                <p className={styles.description}>
                    {task.description || "No description provided."}
                </p>

                <div className={styles.metaRow}>
                    {task.createdAt && (
                        <span className={styles.dateChip}>
                            <FiClock className={styles.metaIcon} />
                            {formatDate(task.createdAt)}
                        </span>
                    )}
                    {task.tags && task.tags.length > 0 && (
                        <div className={styles.tagGroup}>
                            {task.tags.map((tag, idx) => (
                                <span key={idx} className={styles.tag}>#{tag}</span>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <footer className={styles.footer}>
                <div className={styles.deadlineInfo}>
                    {task.deadline ? (
                        <span className={styles.deadline}>
                            <FiCalendar className={styles.metaIcon} />
                            <span style={{ fontSize: '0.625rem', opacity: 0.7, marginRight: '4px' }}>DUE:</span>
                            {formatDate(task.deadline)}
                        </span>
                    ) : <span />} 
                </div>
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
