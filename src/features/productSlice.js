import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(
      "https://timber-backend.vercel.app/api/products"
    );

    return response.data.data.products;
  }
);
export const productSlice = createSlice({
  name: "Products",
  initialState: {
    products: [],
    status: "idle",
    error: null,
    checkBoxFilter: [],
    sortFilter: "Relevance",
    assuredFilter: false,
    ratingFilter: [],
    searchFilter: "",
    rangeFilter: "",
  },
  reducers: {
    setCheckBoxFilter: (state, action) => {
      state.checkBoxFilter = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortFilter = action.payload;
    },
    setAssuredFilter: (state, action) => {
      state.assuredFilter = action.payload;
    },
    setRatingFilter: (state, action) => {
      state.ratingFilter = action.payload;
    },
    setSearchFilter: (state, action) => {
      state.searchFilter = action.payload;
    },
    setRangeFilter: (state, action) => {
      state.rangeFilter = action.payload;
    },
  },
  extraReducers: (builders) => {
    builders.addCase(fetchProducts.pending, (state, action) => {
      state.status = "loading";
    });
    builders.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = "success";
      state.products = action.payload;
    });
    builders.addCase(fetchProducts.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});
export const {
  setCheckBoxFilter,
  setSortBy,
  setAssuredFilter,
  setRatingFilter,
  setSearchFilter,
  setSearch,
  setRangeFilter,
} = productSlice.actions;
export default productSlice.reducer;
