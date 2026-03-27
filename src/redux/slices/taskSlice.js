import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db, auth } from "@/services/firebase";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where, serverTimestamp } from "firebase/firestore";

const initialState = {
    tasks: [],
    loading: false,
    error: null,
};

export const fetchTasks = createAsyncThunk(
    "tasks/fetchTasks",
    async (_, thunkAPI) => {
        try {
            const user = auth.currentUser;
            if (!user) throw new Error("User not authenticated");

            const q = query(
                collection(db, "tasks"),
                where("uid", "==", user.uid)
            );

            const querySnapshot = await getDocs(q);
            const tasks = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            return tasks;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const createTask = createAsyncThunk(
    "tasks/createTask",
    async (taskData, thunkAPI) => {
        try {
            const user = auth.currentUser;

            if (!user) {
                throw new Error("User not authenticated");
            }

            const docRef = await addDoc(collection(db, "tasks"), {
                ...taskData,
                userId: user.uid,
                createdAt: serverTimestamp(),
            });

            return {
                id: docRef.id,
                ...taskData,
                uid: user.uid,
            };
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const updateTask = createAsyncThunk(
    "tasks/updateTask",
    async ({ id, taskData }, thunkAPI) => {
        try {
            const taskDocRef = doc(db, "tasks", id);
            await updateDoc(taskDocRef, taskData);
            return { id, ...taskData };
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const deleteTask = createAsyncThunk(
    "tasks/deleteTask",
    async (id, thunkAPI) => {
        try {
            const taskDocRef = doc(db, "tasks", id);
            await deleteDoc(taskDocRef);
            return id;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        setTasks: (state, action) => {
            state.tasks = action.payload;
        },
        addTaskLocal: (state, action) => {
            state.tasks.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            // fetch
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload.map(task => {
                    const t = { ...task };
                    if (t.createdAt && t.createdAt.toDate) {
                        t.createdAt = t.createdAt.toDate().toISOString();
                    }
                    return t;
                });
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // create
            .addCase(createTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks.push(action.payload);
            })
            .addCase(createTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // update
            .addCase(updateTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.tasks.findIndex(t => t.id === action.payload.id);
                if (index !== -1) {
                    state.tasks[index] = { ...state.tasks[index], ...action.payload };
                }
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // delete
            .addCase(deleteTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = state.tasks.filter(t => t.id !== action.payload);
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setTasks, addTaskLocal } = taskSlice.actions;
export default taskSlice.reducer;