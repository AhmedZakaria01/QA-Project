//? Documentation
/**
 * This file handles user authentication using Redux Toolkit.
 *
 * It includes:
 * - Async actions for login and registration (using createAsyncThunk)
 * - A slice to manage auth state: user info, status, and errors
 * - A logout reducer to clear user data
 *
 * You can use:
 * - `login(credentials)` to log in
 * - `register(userData)` to register a new user
 * - `logout()` to log out the user
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../../services/apiServices";

// Async thunk for logging in a user
export const login = createAsyncThunk("auth/login", async (credentials) => {
  const response = await loginUser(credentials);
  console.log(response);
  return response.data;
});

// Async thunk for registering a new user
export const register = createAsyncThunk("auth/register", async (userData) => {
  const response = await registerUser(userData);
  console.log(response);

  return response.data;
});

// Redux slice for managing authentication state
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {
    // Reducer to handle user logout
    logout(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle login request status updates
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Handle registration
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.log(action);
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
