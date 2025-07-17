import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isMenuPopupOpen: false,
  tablePopUp: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openPopup: (state, action) => {
      if (action.payload === "menu") state.isMenuPopupOpen = true;
      else if (action.payload === "table") state.tablePopUp = true;

      // state.isPopupOpen = true;
    },
    closePopup: (state, action) => {
      if (action.payload === "menu") state.isMenuPopupOpen = false;
      else if (action.payload === "table") state.tablePopUp = false;
    },
  },
});

export const { openPopup, closePopup } = uiSlice.actions;
export default uiSlice.reducer;
