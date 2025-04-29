import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAddress = createAsyncThunk(
  "address/fetchAddress",
  async () => {
    const response = await axios.get(
      "https://timber-backend.vercel.app/address"
    );

    return response.data.address;
  }
);
export const addAddress = createAsyncThunk(
  "address/addAddress",
  async (newAddress) => {
    const response = await axios.post(
      "https://timber-backend.vercel.app/address",
      newAddress
    );

    return response.data.address;
  }
);
export const removeAddress = createAsyncThunk(
  "address/removeAddress",
  async (addressId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `https://timber-backend.vercel.app/address/${addressId}`
      );
      return addressId;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const editAddress = createAsyncThunk(
  "address/editAddress",
  async (updatedAddress) => {
    const { id, ...rest } = updatedAddress;
    const response = await axios.put(
      `https://timber-backend.vercel.app/address/${id}`,
      rest
    );
    return updatedAddress;
  }
);
const addressSlice = createSlice({
  name: "address",
  initialState: {
    addresses: [],
    status: "idle",
    error: null,
    defaultAddress: null,
  },
  reducers: {
    setDefaultAddress: (state, action) => {
      state.defaultAddress = action.payload;
    },
  },
  // extraReducers handles asynchronous requests,
  extraReducers: (builders) => {
    builders
      .addCase(fetchAddress.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.status = "success";
        state.addresses = action.payload;
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = action.error.message;
      }),
      builders.addCase(addAddress.fulfilled, (state, action) => {
        state.addresses.push(action.payload);
      }),
      builders
        .addCase(removeAddress.fulfilled, (state, action) => {
          state.addresses = state.addresses.filter(
            (item) => item._id !== action.payload
          );
        })
        .addCase(removeAddress.rejected, (state, action) => {
          state.status = "error";
          state.error = action.error.message;
        }),
      builders.addCase(editAddress.fulfilled, (state, action) => {
        const index = state.addresses.findIndex(
          (s) => s._id === action.payload.id
        );
        if (index !== -1) {
          state.addresses[index] = action.payload;
        }
      });
  },
});

export const { setDefaultAddress } = addressSlice.actions;
export default addressSlice.reducer;
