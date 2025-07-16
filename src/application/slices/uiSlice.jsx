import { createSlice } from "@reduxjs/toolkit";
import { actions } from "react-table";

const initialState = {
  isPopupOpen: false,
  tablePopUp: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openPopup: (state, action) => {
      if (action.payload === "table") {
        state.tablePopUp = true;
        console.log(action.payload);
      }
      // state.isPopupOpen = true;
    },
    closePopup: (state, action) => {
      if (action.payload === "table") {
        state.tablePopUp = false;
      }
      state.isPopupOpen = false;
    },
  },
});

export const { openPopup, closePopup } = uiSlice.actions;
export default uiSlice.reducer;
