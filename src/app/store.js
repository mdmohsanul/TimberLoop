import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../features/productSlice";
import userSignUpSlice from "../features/userSignUpSlice";
import userLogInSlice from "../features/userLogInSlice";
import addressSlice from "../features/addressSlice";
import cartSlice from "../features/cartSlice";
import wishlistSlice from "../features/wishlistSlice";
import footerSlice from "../features/footerSlice";
import orderSlice from "../features/orderSlice";

const store = configureStore({
  reducer: {
    products: productSlice,
    userSignUp: userSignUpSlice,
    userLogIn: userLogInSlice,
    addresses: addressSlice,
    cart: cartSlice,
    wishlist: wishlistSlice,
    footer: footerSlice,
    order: orderSlice,
  },
});

export default store;
