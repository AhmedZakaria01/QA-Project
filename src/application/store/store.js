import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/authSlice";
import navbarLinksReducer from "../../application/slices/navbar_Links_Slice";
import { uiSlice } from "../slices/uiSlice";
export const store = configureStore({
  reducer: {
    // Auth
    authReducer,

    // Navbar
    navbarLinksReducer,
    ui: uiSlice.reducer, // ✅ give a clean name and use `.reducer`
  },
});
