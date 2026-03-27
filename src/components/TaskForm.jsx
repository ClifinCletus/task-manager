"use client";

import { useState, useEffect } from "react";
import styles from "./TaskForm.module.css";


export default function TaskForm({ onSubmit, initialData = null, loading = false }) {
    const isEditMode = !!initialData;

    const [form, setForm] = useState({
        title: "",
        description: "",
        status: "Todo"
    });

    const [errors, setErrors] = useState({});

    // Populating initial data for edit mode
    useEffect(() => {
        if (initialData) {
            setForm({
                title: initialData.title || "",
                description: initialData.description || "",
                status: initialData.status || "Todo"
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));

        // Clearing error for the field when user types
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!form.title.trim()) {
            newErrors.title = "Title is required";
        } else if (form.title.trim().length < 3) {
            newErrors.title = "Title must be at least 3 characters";
        }

        if (!form.description.trim()) {
            newErrors.description = "Description is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(form);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <header className={styles.header}>
                    <h2 className={styles.title}>
                        {isEditMode ? "Update Task" : "Create New Task"}
                    </h2>
                    <p className={styles.subtitle}>
                        {isEditMode ? "Modify your task details below." : "Organize your workflow by adding a task."}
                    </p>
                </header>

                <form className={styles.form} onSubmit={handleSubmit}>
                    
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="title">Task Title</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            placeholder="What needs to be done?"
                            className={`${styles.input} ${errors.title ? styles.inputError : ""}`}
                            value={form.title}
                            onChange={handleChange}
                            disabled={loading}
                        />
                        {errors.title && <span className={styles.errorMessage}>{errors.title}</span>}
                    </div>

                  
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="status">Current Status</label>
                        <select
                            id="status"
                            name="status"
                            className={styles.select}
                            value={form.status}
                            onChange={handleChange}
                            disabled={loading}
                        >
                            <option value="Todo">Todo</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>

                    
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="description">Task Description</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Add some details about this task..."
                            className={`${styles.textarea} ${errors.description ? styles.inputError : ""}`}
                            value={form.description}
                            onChange={handleChange}
                            disabled={loading}
                        />
                        {errors.description && <span className={styles.errorMessage}>{errors.description}</span>}
                    </div>

                    
                    <button className={styles.submitBtn} type="submit" disabled={loading}>
                        {loading ? (isEditMode ? "Updating..." : "Saving...") : (isEditMode ? "Update Task" : "Create Task")}
                    </button>
                </form>
            </div>
        </div>
    );
}
