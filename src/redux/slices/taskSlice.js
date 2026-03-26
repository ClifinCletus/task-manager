import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: [],
    loading: false,
    error: null,
};

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
});

export const { setTasks, addTaskLocal } = taskSlice.actions;
export default taskSlice.reducer;