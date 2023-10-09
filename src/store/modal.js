import { createSlice } from "@reduxjs/toolkit";
const modalInitialState = {
  isFullOpen: false,
  isComposeOpen: true,
  close: false,
};
const modalSlice = createSlice({
  name: "modal",
  initialState: modalInitialState,
  reducers: {
    openFullHandlerfuc: (state, action) => {
      state.isFullOpen = !state.isFullOpen;
    },
    composeHandler: (state, action) => {
      state.isComposeOpen = !state.isComposeOpen;
    },
    closeHandler: (state) => {
      state.close = !state.close;
    },
  },
});
export const modalSliceActions = modalSlice.actions;
export default modalSlice.reducer;
