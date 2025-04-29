import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOrder = createAsyncThunk(
  "order/fetchOrder",
  async (userId) => {
    const response = await axios.get(
      `https://timber-backend.vercel.app/api/order/${userId}`
    );

    return response.data;
  }
);

export const addOrder = createAsyncThunk(
  "order/addOrder",
  async (newOrder, { dispatch }) => {
    const response = await axios.post(
      "https://timber-backend.vercel.app/api/order/",
      newOrder
    );
    dispatch(fetchOrder(newOrder.userId));

    return response.data;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(fetchOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.status = "success";
        state.orders = action.payload;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      });
  },
});

export default orderSlice.reducer;
