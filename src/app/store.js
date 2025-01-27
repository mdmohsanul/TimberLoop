import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../features/productSlice";
import userSignUpSlice from "../features/userSignUpSlice";
import userLogInSlice from "../features/userLogInSlice";
import addressSlice from "../features/addressSlice";
import cartSlice from "../features/cartSlice";

const store = configureStore({
  reducer: {
    products: productSlice,
    userSignUp: userSignUpSlice,
    userLogIn: userLogInSlice,
    addresses: addressSlice,
    cart: cartSlice,
  },
});

export default store;
