import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchCart,
  getCartTotalPrice,
  getCartTotalQuantity,
  getCartTotalSavings,
} from "../features/cartSlice";
import Cart_Card from "../components/Cart/Cart_Card";
import { useNavigate } from "react-router-dom";
import Order_Summary from "../components/Order_Summary";
import Empty_Products from "../components/Empty_Products";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useCurrentUser from "../hooks/useCurrentUser";

import ShimerUI_ProductsPage from "../components/ShimmerUI/ShimerUI_ProductsPage";

const Cart_Page = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useCurrentUser();
  const { cartProducts, error, status } = useSelector((state) => state.cart);

  const checkoutHandler = () => {
    if (!user) return navigate("/login");
    if (cartProducts.length > 0) {
      navigate("/cart/checkout");
    }
  };

  // dispatch product to wishlist

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getCartTotalPrice());
    dispatch(getCartTotalQuantity());
    dispatch(getCartTotalSavings());
  }, [dispatch, cartProducts]);
  useEffect(() => {
    if (user?._id) {
      dispatch(fetchCart(user._id));
    }
  }, [dispatch, user?._id]);

  if (status === "loading")
    return (
      <>
        <ShimerUI_ProductsPage />
      </>
    );
  if (status === "failed")
    return (
      <>
        <p>{error}</p>
      </>
    );
  return (
    <>
      <section className="bg-white mt-16 md:mt-20 min-h-screen antialiased dark:bg-gray-900 mb-7">
        <ToastContainer />
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-center md:text-3xl text-2xl font-medium text-gray-700 py-2">
            Cart Items{" "}
            <span className="md:text-2xl text-xl">
              ({cartProducts?.length})
            </span>
          </h2>
          {cartProducts?.length === 0 && <Empty_Products name="cart" />}

          {status === "success" && cartProducts !== null && (
            <div className="mt-3 md:mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
              <Cart_Card />
              <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                <Order_Summary deliveryCharges={false} />
                <button
                  className="flex w-full items-center justify-center rounded-lg text-white bg-blue-700 px-5 py-2.5 text-sm font-medium  hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  onClick={checkoutHandler}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Cart_Page;
