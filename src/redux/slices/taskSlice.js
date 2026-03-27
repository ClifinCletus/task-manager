import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db, auth } from "@/services/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const initialState = {
    tasks: [],
    loading: false,
    error: null,
};

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