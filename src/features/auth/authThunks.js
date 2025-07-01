// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// src/features/auth/authThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../../services/apiServices";

// Login thunk
export const login = createAsyncThunk("auth/login", async (credentials) => {
  const response = await loginUser(credentials);
  return response.data;
});

// Register thunk
export const register = createAsyncThunk("auth/register", async (userData) => {
  const response = await registerUser(userData);
  return response.data;
});
