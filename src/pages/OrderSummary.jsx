import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { setDefaultAddress } from "../features/addressSlice";
import { fetchOrder } from "../features/orderSlice";

const OrderSummary = () => {
  const dispatch = useDispatch();

  const { defaultAddress, addresses } = useSelector((state) => state.addresses);
  const { orders, status, error } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.userLogIn);

  console.log("defaultAddress", defaultAddress);
  console.log("orders", orders);
  console.log("user", user);
  useEffect(() => {
    dispatch(fetchOrder(user?.user?._id));
    // dispatch(setDefaultAddress(null));
  }, []);
  return (
    <>
      <section className="w-full min-h-screen pt-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center md:text-3xl text-2xl font-medium text-gray-700 py-2 mb-5">
            Order Summary
          </h2>
          {status === "loading" && <p>Loading ....</p>}
          {error && <p>{error}</p>}
          {status === "success" && (
            <div className="border border-blue-600 rounded-md py-4 px-5">
              <h2>Thanks for shopping with us!</h2>
              <p>Order ID: {orders[0]?._id}</p>
              <p>Total Amount: {orders[0]?.totalPrice}</p>
              <p>Order Date: {orders[0]?.createdAt}</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default OrderSummary;
