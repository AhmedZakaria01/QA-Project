import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../../services/apiServices";

export const login = createAsyncThunk("auth/login", async (credentials) => {
  const response = await loginUser(credentials);
  console.log(response);

  return response.data;
});

export const register = createAsyncThunk("auth/register", async (userData) => {
  const response = await registerUser(userData);
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
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
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
