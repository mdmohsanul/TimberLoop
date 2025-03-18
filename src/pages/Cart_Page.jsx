import React, { useEffect, useState } from "react";
import { IoHeartSharp } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import {
  decrementQuantity,
  fetchCart,
  getCartTotalPrice,
  getCartTotalQuantity,
  getCartTotalSavings,
  incrementQuantity,
  removeAllProducts,
  removeProduct,
} from "../features/cartSlice";
import { FiPlus, FiMinus } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import Order_Summary from "../components/Order_Summary";
import Empty_Products from "../components/Empty_Products";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useWishlistHandler from "../hooks/useWishlistHandler";
import ShimerUI_ProductsPage from "../components/ShimmerUI/ShimerUI_ProductsPage";

const Cart_Page = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartProducts, status, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.userLogIn);

  const [checkWishlistProduct, setCheckWishlistProduct] = useState("");

  const checkoutHandler = () => {
    if (cartProducts.length != 0) {
      navigate("/cart/checkout");
    }
  };
  const removeProductHandler = (productId) => {
    const data = {
      userId: user?._id,
      productId: productId,
    };
    dispatch(removeProduct(data));
    toast("Product removed form cart", {
      autoClose: 2000,
    });
  };

  // dispatch product to wishlist
  const handleWishlist = useWishlistHandler();

  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(getCartTotalPrice());
    dispatch(getCartTotalQuantity());
    dispatch(getCartTotalSavings());
  });
  useEffect(() => {
    dispatch(fetchCart(user?._id));
  }, [dispatch]);
  return (
    <>
      <section className="bg-white mt-16 md:mt-20 min-h-screen  antialiased dark:bg-gray-900 mb-7">
        <ToastContainer />
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-center md:text-3xl text-2xl font-medium text-gray-700 py-2">
            Cart Items{" "}
            <span className="md:text-2xl text-xl">
              ({cartProducts?.length})
            </span>
          </h2>

          {status === "loading" && <ShimerUI_ProductsPage />}
          {cartProducts?.length === 0 && <Empty_Products name="cart" />}
          {/* {error && <p>{error}</p>} */}
          {status === "success" && cartProducts !== null && (
            <div className="mt-3 md:mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
              <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                <div className="space-y-6">
                  <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                    {cartProducts?.map((item) => (
                      <div
                        key={item._id}
                        className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 mb-4 md:space-y-0"
                      >
                        <Link
                          to={`/products/${item?.productId?._id}`}
                          className="shrink-0 md:order-1"
                        >
                          <img
                            className="h-20 w-20 dark:hidden"
                            src={`https://i.pinimg.com/${item?.productId?.image}`}
                            alt="imac image"
                          />
                        </Link>

                        <label htmlFor="counter-input" className="sr-only">
                          Choose quantity:
                        </label>
                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                          <div className="flex items-center">
                            <button
                              type="button"
                              onClick={() => {
                                dispatch(
                                  incrementQuantity(item?.productId._id)
                                );
                              }}
                              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                            >
                              <FiPlus />
                            </button>
                            <p className="px-3">{item?.quantity}</p>
                            <button
                              type="button"
                              onClick={() => {
                                dispatch(
                                  decrementQuantity(item?.productId._id)
                                );
                              }}
                              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                            >
                              <FiMinus />
                            </button>
                          </div>
                          <div className="text-end md:order-4 md:w-32">
                            <p className="text-base font-bold text-gray-900 dark:text-white">
                              {(
                                item?.productId?.price -
                                (item?.productId?.price *
                                  item?.productId?.discount) /
                                  100
                              ).toFixed(2) * item?.quantity}
                            </p>
                          </div>
                        </div>

                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                          <Link
                            to={`/products/${item?.productId?._id}`}
                            className="text-base font-medium text-gray-900 hover:underline dark:text-white"
                          >
                            {item?.productId?.name}
                          </Link>

                          <div className="flex items-center gap-4">
                            <button
                              type="button"
                              onClick={() => {
                                handleWishlist(
                                  item?.productId?._id,
                                  setCheckWishlistProduct
                                );
                                removeProductHandler(item?.productId?._id);
                              }}
                              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
                            >
                              <IoHeartSharp size={20} />
                              Add to Favorites
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                removeProductHandler(item?.productId?._id)
                              }
                              className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                            >
                              <RxCross2 size={20} />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                <Order_Summary />
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
