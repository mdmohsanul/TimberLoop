import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signUpUser = createAsyncThunk(
  "user/loginUser",
  async ({ userName, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://timber-backend.vercel.app/api/signup",
        { userName, email, password }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);
const userSignUpSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    status: "idle",
    error: null,
  },
  extraReducers: (builders) => {
    builders.addCase(signUpUser.pending, (state, action) => {
      state.status = "loading";
    });
    builders.addCase(signUpUser.fulfilled, (state, action) => {
      state.status = "success";
      state.user = action.payload;
    });
    builders.addCase(signUpUser.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export default userSignUpSlice.reducer;
