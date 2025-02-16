import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }) => {
    const request = await axios.post(
      "https://timber-backend.vercel.app/api/login",
      { email, password }
    );
    const response = await request.data;
    localStorage.setItem("userId", response.user._id);
    localStorage.setItem("adminToken", response.token);
    return response;
  }
);
const userLogInSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    status: "idle",
    error: null,
  },
  extraReducers: (builders) => {
    builders.addCase(loginUser.pending, (state, action) => {
      state.status = "loading";
    });
    builders.addCase(loginUser.fulfilled, (state, action) => {
      state.status = "success";
      state.user = action.payload;
    });
    builders.addCase(loginUser.rejected, (state, action) => {
      state.status = "error";

      state.error = action.error.message;
    });
  },
});

export default userLogInSlice.reducer;
