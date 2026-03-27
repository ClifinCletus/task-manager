"use client";

import { FiEdit2, FiTrash2, FiCalendar, FiClock, FiCheckCircle } from "react-icons/fi";
import { BsPinAngle, BsPinAngleFill } from "react-icons/bs";
import styles from "./TaskCard.module.css";
import StatusBadge from "./StatusBadge";

export default function TaskCard({ task, onEdit, onDelete, onStatusChange, onPinToggle }) {
    const isDone = task.status === "Done";

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
        const nextStatus = isDone ? "Todo" : "Done";
        onStatusChange(task.id, nextStatus);
    };

    return (
        <article className={`${styles.card} ${isDone ? styles.cardDone : ""} ${task.pinned ? styles.cardPinned : ""}`}>
            <header className={styles.header}>
                <div className={styles.topInfo}>
                    <button
                        onClick={handleComplete}
                        className={`${styles.statusToggle} ${isDone ? styles.toggleDone : ""}`}
                    >
                        {isDone ? <FiCheckCircle size={14}/> : <div className={styles.checkboxCircle} />}
                        <span className={styles.statusActionLabel}>
                            {isDone ? "DONE" : "TODO"}
                        </span>
                    </button>
                    <StatusBadge status={task.status} />
                </div>

                <div className={styles.rightControls}>
                    {task.pinned && (
                        <div className={styles.priorityIndicator}>
                            <BsPinAngleFill size={11} />
                            <span>PRIORITY</span>
                        </div>
                    )}
                    <button
                        onClick={() => onPinToggle(task)}
                        className={`${styles.pinBtn} ${task.pinned ? styles.pinActive : ""}`}
                        title={task.pinned ? "Unpin task" : "Pin to top (Max 2)"}
                    >
                        {task.pinned ? <BsPinAngleFill size={15} /> : <BsPinAngle size={15} />}
                    </button>
                    <div className={`${styles.urgencyBadge} ${getUrgencyClass(task.urgency)}`}>
                        <div className={styles.dot}></div>
                        <span>{task.urgency}</span>
                    </div>
                </div>
            </header>

            <div className={styles.content}>
                <h3 className={`${styles.title} ${isDone ? styles.titleDone : ""}`}>
                    {task.title}
                </h3>
                <p className={`${styles.description} ${isDone ? styles.descDone : ""}`}>
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
                        <span className={`${styles.deadline} ${isDone ? styles.deadlineDone : ""}`}>
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
                        <FiEdit2 size={12} />
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className={`${styles.actionBtn} ${styles.deleteBtn}`}
                        aria-label="Delete task"
                    >
                        <FiTrash2 size={12} />
                    </button>
                </div>
            </footer>
        </article>
    );
}
