"use client";

import { FiSearch } from "react-icons/fi";
import styles from "./TaskFilters.module.css";

const PREDEFINED_TAGS = ["Work", "Home", "Study", "Personal", "Health", "Finance"];

export default function TaskFilters({ filters, setFilters }) {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className={styles.filterBar}>

            <div className={styles.searchGroup}>
                <FiSearch className={styles.searchIcon} />
                <input
                    type="text"
                    name="search"
                    placeholder="Search tasks..."
                    value={filters.search}
                    onChange={handleChange}
                    className={styles.searchInput}
                />
            </div>


            <div className={styles.filterGroup}>
                <select
                    name="status"
                    className={styles.select}
                    value={filters.status}
                    onChange={handleChange}
                >
                    <option value="">All Status</option>
                    <option value="Todo">Todo</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>
            </div>


            <div className={styles.filterGroup}>
                <select
                    name="urgency"
                    className={styles.select}
                    value={filters.urgency}
                    onChange={handleChange}
                >
                    <option value="">Any Urgency</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            </div>


            <div className={styles.filterGroup}>
                <select
                    name="tag"
                    className={styles.select}
                    value={filters.tag}
                    onChange={handleChange}
                >
                    <option value="">Any Tag</option>
                    {PREDEFINED_TAGS.map(t => (
                        <option key={t} value={t}>{t}</option>
                    ))}
                </select>
            </div>


            <div className={styles.filterGroup}>
                <select
                    name="sort"
                    className={styles.select}
                    value={filters.sort}
                    onChange={handleChange}
                >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="deadline">By Deadline</option>
                </select>
            </div>
        </div>
    );
}
