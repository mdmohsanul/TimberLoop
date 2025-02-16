import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setDefaultAddress } from "../features/addressSlice";
import { fetchOrder } from "../features/orderSlice";

const OrderSummary = () => {
  const dispatch = useDispatch();

  const { defaultAddress, addresses } = useSelector((state) => state.addresses);
  const { orders, status, error } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.userLogIn);

  useEffect(() => {
    dispatch(fetchOrder(user?.user?._id));
    // dispatch(setDefaultAddress(null));
  }, [dispatch]);
  return (
    <>
      <section className="w-full min-h-screen pt-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center md:text-3xl text-2xl font-medium text-gray-700 py-2 mb-5">
            Order Summary
          </h2>
          {status === "loading" && <p>Loading ....</p>}

          {status === "success" && (
            <div className="border border-gray-600 rounded-md py-4 md:px-5 px-3 mb-8 mx-3">
              <h2 className="text-center text-gray-600 text-xl md:text-2xl pb-4">
                Thanks for shopping with us!
              </h2>
              <p>Order ID: {orders[0]?._id}</p>
              <p className="pb-3">Order Date: {orders[0]?.createdAt}</p>
              <ul>
                {orders[0]?.products?.map((item) => (
                  <li
                    key={item._id}
                    className="border border-gray-300 rounded-md mb-4 md:p-4 p-2 flex justify-start md:gap-6 gap-3"
                  >
                    <img
                      src={`https://i.pinimg.com/${item?.productId?.image}`}
                      alt="product image"
                      className="md:w-20 md:h-16  w-16 h-14"
                    />

                    <p className="flex flex-col flex-1">
                      <span className="font-semibold">
                        {item?.productId?.name}{" "}
                      </span>{" "}
                      <span className="text-sm">
                        By {item?.productId?.brand_name}
                      </span>{" "}
                      <span className="text-sm text-gray-500">
                        Qty - {item?.quantity}
                      </span>
                    </p>

                    <p className="font-medium md:pr-10  flex flex-col ">
                      <span className="text-gray-800">
                        ₹ {item?.price.toFixed(2)}
                      </span>
                      <span className="line-through text-gray-500">
                        ₹ {item?.productId?.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-red-500">
                        {item?.productId?.discount}% Off
                      </span>
                    </p>
                  </li>
                ))}
              </ul>

              <p>Total Amount: {orders[0]?.totalPrice + 399 + 799}</p>
              <p className="text-red-500">
                You Saved{" "}
                {(
                  orders[0]?.products.reduce(
                    (sum, curr) => sum + curr?.productId?.price,
                    0
                  ) - orders[0]?.totalPrice
                ).toFixed(2)}{" "}
                in this order.
              </p>
            </div>
          )}
          <div className="my-7 flex gap-5 justify-center">
            <Link
              to="/orders"
              className="py-3 px-6 bg-gray-600 hover:bg-gray-700 text-white rounded-md"
            >
              Order
            </Link>
            <Link
              to="/products"
              className="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              Shop More
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderSummary;
