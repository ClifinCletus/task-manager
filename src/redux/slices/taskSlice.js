import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db, auth } from "@/services/firebase";
import { collection, addDoc, getDocs, query, where, serverTimestamp } from "firebase/firestore";

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
                uid: user.uid,
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
                // Simple conversion for createdAt timestamp from Firestore to serializable string if exists
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

            //pending
            .addCase(createTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            // success
            .addCase(createTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks.push(action.payload);
            })

            // error
            .addCase(createTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setTasks, addTaskLocal } = taskSlice.actions;
export default taskSlice.reducer;