import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://timber-backend.vercel.app/api/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("userId", JSON.stringify(response.data.user._id));
      localStorage.setItem("adminToken", response.data.token);

      return response.data;
    } catch (error) {
      // console.error(
      //   "Login Error:",
      //   error.response?.data.message || error.message
      // );
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);
const userLogInSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: localStorage.getItem("adminToken") || null,
    status: "idle",
    error: null,
  },
  extraReducers: (builders) => {
    builders.addCase(loginUser.pending, (state, action) => {
      state.status = "loading";
    });
    builders.addCase(loginUser.fulfilled, (state, action) => {
      state.status = "success";
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builders.addCase(loginUser.rejected, (state, action) => {
      state.status = "error";

      state.error = action.error.message;
    });
  },
});

export default userLogInSlice.reducer;
