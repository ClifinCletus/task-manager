"use client";

import styles from "./StatusBadge.module.css";

export default function StatusBadge({ status }) {
    const getStatusClass = () => {
        switch (status) {
            case "Todo":
                return styles.todo;
            case "In Progress":
                return styles.inProgress;
            case "Done":
                return styles.done;
            default:
                return "";
        }
    };

    return (
        <span className={`${styles.badge} ${getStatusClass()}`}>
            {status}
        </span>
    );
}
