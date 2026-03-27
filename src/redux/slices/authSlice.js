"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../services/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";

// Helper for readable error messages
const getErrorMessage = (error) => {
    switch (error.code) {
        case "auth/email-already-in-use":
            return "This email is already registered.";
        case "auth/invalid-email":
            return "Please enter a valid email address.";
        case "auth/weak-password":
            return "Password should be at least 6 characters.";
        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/invalid-credential":
            return "Invalid email or password.";
        case "auth/operation-not-allowed":
            return "Email/Password sign-in is not enabled.";
        default:
            return "Authentication failed. Please try again.";
    }
};

// SIGNUP
export const signupUser = createAsyncThunk(
    "auth/signupUser",
    async ({ email, password }, thunkAPI) => {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const user = res.user;

            return {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
            };
        } catch (err) {
            return thunkAPI.rejectWithValue(getErrorMessage(err));
        }
    }
);

// LOGIN
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }, thunkAPI) => {
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            const user = res.user;

            return {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
            };
        } catch (err) {
            return thunkAPI.rejectWithValue(getErrorMessage(err));
        }
    }
);

// LOGOUT
export const logout = createAsyncThunk(
    "auth/logout",
    async () => {
        await signOut(auth);
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: false,
        isAuthReady: false, // NEW: track if Firebase has initially checked auth state
        error: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthReady = true; // Once auth check returns, we are ready
        },
    },
    extraReducers: (builder) => {
        builder
            // signup
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthReady = true;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthReady = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // logout
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.isAuthReady = true;
            });
    },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;