import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId) => {
  console.log(userId);

  const response = await axios.get(
    `https://timber-backend.vercel.app/api/cart/${userId}`
  );

  return response.data.products;
});

export const addProduct = createAsyncThunk(
  "cart/addProduct",
  async (cartDetails) => {
    const response = await axios.post(
      "https://timber-backend.vercel.app/api/cart",
      cartDetails
    );
    console.log(response.data);
    return response.data.products[response.data.products.length - 1];
  }
);

export const removeProduct = createAsyncThunk(
  "cart/removeProduct",
  async ({ userId, productId }) => {
    // console.log("userID", userId);
    // console.log("productId", productId);

    const response = await axios.delete(
      `https://timber-backend.vercel.app/api/cart/user/${userId}/products/${productId}`
    );
    return productId;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartProducts: [],
    status: "idle",
    error: null,
  },
  reducers: {
    incrementQuantity: (state, action) => {
      const item = state.cartProducts.find(
        (item) => item.productId._id === action.payload
      );
      item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.cartProducts.find(
        (item) => item.productId._id === action.payload
      );
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
  },
  extraReducers: (builders) => {
    builders
      .addCase(fetchCart.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "success";
        console.log("fetch cart", action.payload);
        state.cartProducts = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.error = action.error.message;
      }),
      builders.addCase(addProduct.fulfilled, (state, action) => {
        console.log("add product", action.payload);
        state?.cartProducts?.push(action.payload);
      }),
      builders.addCase(removeProduct.fulfilled, (state, action) => {
        state.cartProducts = state?.cartProducts?.filter(
          (item) => item.productId._id !== action.payload
        );
      });
  },
});
export const { incrementQuantity, decrementQuantity, setTotalProducts } =
  cartSlice.actions;
export default cartSlice.reducer;
