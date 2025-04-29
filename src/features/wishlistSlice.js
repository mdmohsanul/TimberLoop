import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWishlist = createAsyncThunk(
  "/api/wishlist",
  async (userId) => {
    const response = await axios.get(
      `https://timber-backend.vercel.app/api/wishlist/${userId}`
    );
    return response.data.products;
  }
);

export const addWishlistProduct = createAsyncThunk(
  "/api/addWishlist",
  async (wishlistDetails) => {
    const response = await axios.post(
      `https://timber-backend.vercel.app/api/wishlist/`,
      wishlistDetails
    );

    return response.data.products[response.data.products.length - 1];
  }
);

export const removeWishListProduct = createAsyncThunk(
  "/api/removeProduct",
  async ({ userId, productId }) => {
    const response = await axios.delete(
      `https://timber-backend.vercel.app/api/wishlist/user/${userId}/product/${productId}`
    );
    return productId;
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlistProducts: JSON.parse(localStorage.getItem("wishlist")) || [],
    error: null,
    status: "idle",
  },
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(fetchWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.status = "success";
        state.wishlistProducts = action.payload;
        localStorage.setItem("wishlist", JSON.stringify(action.payload));
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addWishlistProduct.fulfilled, (state, action) => {
        state.wishlistProducts.push(action.payload);
        localStorage.setItem(
          "wishlist",
          JSON.stringify(state.wishlistProducts)
        );
      })
      .addCase(removeWishListProduct.fulfilled, (state, action) => {
        state.wishlistProducts = state?.wishlistProducts?.filter(
          (item) => item._id !== action.payload
        );
        localStorage.setItem(
          "wishlist",
          JSON.stringify(state.wishlistProducts)
        );
      });
  },
});

export default wishlistSlice.reducer;
