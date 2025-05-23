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
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);

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

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) throw new Error("No token found");

      const response = await axios.get(
        "https://timber-backend.vercel.app/api/protected",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) throw new Error("Failed to fetch user data");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const userLogInSlice = createSlice({
  name: "user",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    status: "idle",
    error: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user; // Save user details
      state.token = action.payload.token; // Save token
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = "idle";
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builders) => {
    builders
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      }),
      builders
        .addCase(fetchUser.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchUser.fulfilled, (state, action) => {
          state.user = action.payload.user;
          state.status = "success";
        })
        .addCase(fetchUser.rejected, (state, action) => {
          state.error = action.error.message;
          state.status = action.payload || action.error.message;
        });
  },
});

export const { loginSuccess, logout, clearError } = userLogInSlice.actions;

export default userLogInSlice.reducer;
