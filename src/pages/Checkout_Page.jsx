import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Address_List from "../components/Address/Address_List";
import Order_Summary from "../components/Order_Summary";
import { addOrder } from "../features/orderSlice";
import { removeAllProducts } from "../features/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Checkout_Page = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { defaultAddress, addresses } = useSelector((state) => state.addresses);
  const { user } = useSelector((state) => state.userLogIn);
  const { cartProducts, cartTotalPrice, cartTotalQuantity } = useSelector(
    (state) => state.cart
  );
  const products = cartProducts.map((item) => ({
    productId: item.productId._id,
    quantity: item.quantity,
    price: (
      item?.productId?.price -
      (item?.productId?.price * item?.productId?.discount) / 100
    ).toFixed(2),
  }));

  const placeOrderHandler = () => {
    console.log("clicked");
    /* 
      remove all cart items
      add placed order to order API
    
    */

    // validate Address
    if (defaultAddress !== null) {
      const newOrder = {
        userId: user?.user?._id,
        products: products,
      };
      console.log(newOrder);
      console.log(defaultAddress);
      dispatch(addOrder(newOrder));
      dispatch(removeAllProducts(user?.user?._id));
      toast.error("Select Address");
      navigate("/cart/checkout/orderSummary");
    }
  };
  return (
    <>
      <section className=" max-w-6xl mx-auto min-h-screen pt-20 px-3">
        <ToastContainer />
        <div className="grid md:grid-cols-3 py-5 md:gap-8 justify-items-stretch">
          <div className="md:col-span-2">
            <div className="border border-gray-300 mb-0">
              <p className="bg-blue-500 py-2 px-4 text-lg text-white">LOGIN</p>
              <div className="px-4 py-3 flex items-center justify-between">
                <p>
                  {user?.user?.userName} - {defaultAddress?.mobileNum}
                </p>
                <button
                  className="cursor-pointer border py-2 px-4 text-blue-700"
                  onClick={() => navigate("/userProfile")}
                >
                  CHANGE
                </button>
              </div>
            </div>
            <div className="border border-gray-300 mb-4">
              <p className="bg-blue-500 py-2 px-4 text-lg text-white">
                ADDRESS
              </p>
              <div className="px-4 py-3 ">
                <Address_List />
                {/* <span>
                  <p className="pb-2 font-medium">{defaultAddress?.name}</p>
                  <p>
                    {defaultAddress?.locality}, {defaultAddress?.fullAddress}
                  </p>
                  <p>
                    {defaultAddress?.city}, {defaultAddress?.state} -
                    {defaultAddress?.pincode}
                  </p>
                </span>
                <button
                  className="cursor-pointer border py-2 px-4 text-blue-700"
                  onClick={() => navigate("/userProfile/address")}
                >
                  CHANGE
                </button> */}
              </div>
            </div>
          </div>
          <div className=" mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <Order_Summary />
            <button
              className="flex w-full items-center justify-center rounded-lg text-white bg-blue-700 px-5 py-2.5 text-sm font-medium  hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              onClick={placeOrderHandler}
            >
              Place Order
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout_Page;
