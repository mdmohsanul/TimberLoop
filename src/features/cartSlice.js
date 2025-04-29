import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId) => {
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
    return response.data.products[response.data.products.length - 1];
  }
);

export const removeProduct = createAsyncThunk(
  "cart/removeProduct",
  async ({ userId, productId }) => {
    const response = await axios.delete(
      `https://timber-backend.vercel.app/api/cart/user/${userId}/products/${productId}`
    );
    return productId;
  }
);
export const removeAllProducts = createAsyncThunk(
  "cart/removeAllProduct",
  async (userId) => {
    const response = await axios.delete(
      `https://timber-backend.vercel.app/api/cart/user/${userId}`
    );
    return userId;
  }
);
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartProducts: [],
    status: "idle",
    error: null,
    cartTotalPrice: 0,
    cartTotalQuantity: 0,
    cartTotalDiscount: 0,
    cartTotalSavings: 0,
    cartTotalPriceWithDelivery: 0,
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
    getCartTotalPrice: (state, action) => {
      let totalPrice = 0;
      state.cartProducts?.forEach((item) => {
        totalPrice +=
          (
            item?.productId?.price -
            (item?.productId?.price * item?.productId?.discount) / 100
          ).toFixed(2) * item.quantity;
      });
      state.cartTotalPrice = totalPrice;
    },
    getCartTotalQuantity: (state, action) => {
      let totalQuantity = 0;
      state.cartProducts?.forEach((item) => {
        totalQuantity += item.quantity;
      });
      state.cartTotalQuantity = totalQuantity;
    },
    getCartTotalSavings: (state, action) => {
      let totalDiscountPrice = 0;
      state.cartProducts?.forEach((item) => {
        totalDiscountPrice +=
          ((item?.productId?.price * item?.productId?.discount) / 100).toFixed(
            2
          ) * item.quantity;
      });
      state.cartTotalSavings = totalDiscountPrice;
    },
    getCartTotalWithDelivery: (state, action) => {
      state.cartTotalPriceWithDelivery = action.payload;
    },
  },
  extraReducers: (builders) => {
    builders
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "success";

        state.cartProducts = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      }),
      builders.addCase(addProduct.fulfilled, (state, action) => {
        state?.cartProducts?.push(action.payload);
      }),
      builders.addCase(removeProduct.fulfilled, (state, action) => {
        state.cartProducts = state?.cartProducts?.filter(
          (item) => item.productId._id !== action.payload
        );
      }),
      builders.addCase(removeAllProducts.fulfilled, (state) => {
        state.cartProducts = [];
      });
  },
});
export const {
  incrementQuantity,
  decrementQuantity,
  setTotalProducts,
  getCartTotalPrice,
  getCartTotalQuantity,
  getCartTotalSavings,
  getCartTotalWithDelivery,
} = cartSlice.actions;
export default cartSlice.reducer;
