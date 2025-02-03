import { createSlice } from "@reduxjs/toolkit";

const footerSlice = createSlice({
  name: "footer",
  initialState: {
    isStickyBottom: false,
  },
  reducers: {
    setStickyBottom: (state, action) => {
      state.isStickyBottom = action.payload;
    },
  },
});

export const { setStickyBottom } = footerSlice.actions;
export default footerSlice.reducer;
