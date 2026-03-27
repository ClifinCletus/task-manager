"use client";

import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
    fetchTasks,
    createTask as addTaskThunk,
    updateTask as updateTaskThunk,
    deleteTask as deleteTaskThunk
} from "@/redux/slices/taskSlice";


export function useTasks(userId) {
    const dispatch = useDispatch();
    const { tasks, loading, error } = useSelector((state) => state.tasks);

    // Initial Fetch
    useEffect(() => {
        if (userId) {
            dispatch(fetchTasks(userId));
        }
    }, [userId, dispatch]);

    const addTask = useCallback(async (taskData) => {
        try {
            if (!userId) throw new Error("User unauthorized");
            await dispatch(addTaskThunk({ ...taskData, userId })).unwrap();
            toast.success("Task created successfully!");
        } catch (err) {
            toast.error(err.message || "Failed to create task");
            throw err;
        }
    }, [userId, dispatch]);

    const updateTask = useCallback(async (taskId, updates) => {
        try {
            await dispatch(updateTaskThunk({ id: taskId, ...updates })).unwrap();
            toast.success("Task updated!");
        } catch (err) {
            toast.error(err.message || "Update failed");
            throw err;
        }
    }, [dispatch]);

    const deleteTask = useCallback(async (taskId) => {
        try {
            await dispatch(deleteTaskThunk(taskId)).unwrap();
            toast.success("Task removed");
        } catch (err) {
            toast.error(err.message || "Deletion failed");
            throw err;
        }
    }, [dispatch]);

    const togglePin = useCallback(async (task) => {
        const pinnedCount = tasks.filter(t => t.pinned).length;
        if (!task.pinned && pinnedCount >= 2) {
            toast.error("You can only pin up to 2 tasks");
            return;
        }

        try {
            await dispatch(updateTaskThunk({
                id: task.id,
                pinned: !task.pinned
            })).unwrap();
            toast.success(task.pinned ? "Task unpinned" : "Task pinned to top!");
        } catch (err) {
            toast.error(err.message || "Pinning failed");
        }
    }, [tasks, dispatch]);

    return {
        tasks,
        loading,
        error,
        addTask,
        updateTask,
        deleteTask,
        togglePin,
        refresh: () => userId && dispatch(fetchTasks(userId))
    };
}
