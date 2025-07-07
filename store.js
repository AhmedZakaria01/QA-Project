import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./src/features/auth/authSlice";
import navbarLinksReducer from "./src/application/slices/navbar_Links_Slice";
import { uiSlice } from "./src/application/slices/uiSlice";
export const store = configureStore({
  reducer: {
    // Auth
    authReducer,

    // Navbar
    navbarLinksReducer,
    ui: uiSlice.reducer, // ✅ give a clean name and use `.reducer`
  },
});
