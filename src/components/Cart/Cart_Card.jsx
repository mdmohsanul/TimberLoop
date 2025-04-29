import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { IoHeartSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import {
  decrementQuantity,
  incrementQuantity,
  removeProduct,
} from "../../features/cartSlice";
import { FiPlus, FiMinus } from "react-icons/fi";
import useWishlistHandler from "../../hooks/useWishlistHandler";
import { useState } from "react";
import { toast } from "react-toastify";
import useCurrentUser from "../../hooks/useCurrentUser";

const Cart_Card = () => {
  const dispatch = useDispatch();
  const { cartProducts } = useSelector((state) => state.cart);
  const { user } = useCurrentUser();
  const [checkWishlistProduct, setCheckWishlistProduct] = useState("");

  const handleWishlist = useWishlistHandler();
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
  return (
    <>
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
                        dispatch(incrementQuantity(item?.productId._id));
                      }}
                      className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                    >
                      <FiPlus />
                    </button>
                    <p className="px-3">{item?.quantity}</p>
                    <button
                      type="button"
                      onClick={() => {
                        dispatch(decrementQuantity(item?.productId._id));
                      }}
                      className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700
                      ${
                        item.quantity === 1
                          ? "cursor-not-allowed disabled:bg-gray-200"
                          : ""
                      }
                      `}
                    >
                      <FiMinus />
                    </button>
                  </div>
                  <div className="text-end md:order-4 md:w-32">
                    <p className="text-base font-bold text-gray-900 dark:text-white">
                      {(
                        item?.productId?.price -
                        (item?.productId?.price * item?.productId?.discount) /
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
                      onClick={() => removeProductHandler(item?.productId?._id)}
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
    </>
  );
};

export default Cart_Card;
