import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Address_List from "../components/Address/Address_List";
import Order_Summary from "../components/Order_Summary";
import Address_Page from "./Address_Page";

const Checkout_Page = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { defaultAddress, addresses } = useSelector((state) => state.addresses);
  const { user } = useSelector((state) => state.userLogIn);
  const { cartTotalPrice, cartTotalQuantity } = useSelector(
    (state) => state.cart
  );

  console.log(defaultAddress);
  console.log(user);
  console.log(cartTotalPrice);
  console.log(cartTotalQuantity);

  return (
    <>
      <div className=" max-w-6xl mx-auto min-h-screen pt-20">
        <div className="grid md:grid-cols-3 py-5 gap-8 justify-items-center">
          <div className="md:col-span-2">
            <div className="border border-gray-300 mb-4">
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
          <div>
            <Order_Summary />
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout_Page;
