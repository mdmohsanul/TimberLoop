import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Address_List from "../components/Address/Address_List";
import Order_Summary from "../components/Order_Summary";
import { addOrder, fetchOrder } from "../features/orderSlice";
import { fetchCart, removeAllProducts } from "../features/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Payment from "../components/Payment/Payment";
import { useEffect } from "react";
import { setDefaultAddress } from "../features/addressSlice";

const Checkout_Page = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { defaultAddress, addresses } = useSelector((state) => state.addresses);

  const { user } = useSelector((state) => state.userLogIn);
  const { cartProducts, cartTotalPriceWithDelivery } = useSelector(
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
  console.log("cartTotalPriceWithDelivery ", cartTotalPriceWithDelivery);
  useEffect(() => {
    dispatch(fetchCart(user?._id));
    dispatch(setDefaultAddress(addresses[0]));
  }, []);
  const newOrder = {
    userId: user?._id,
    products: products,
  };
  const placeOrderHandler = async () => {
    /* 
      remove all cart items
      add placed order to order API
    
    */

    // validate Address
    if (defaultAddress !== null) {
      const newOrder = {
        userId: user?._id,
        products: products,
      };

      dispatch(addOrder(newOrder));
      dispatch(fetchOrder(user?._id));
      dispatch(removeAllProducts(user?._id));
      setTimeout(() => {
        navigate("/cart/checkout/orderSummary");
      }, 2000);
    } else {
      toast.error("Select Address");
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
                <p>LoggedIn User: {user?.userName}</p>
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
                {defaultAddress ? (
                  <div>
                    <p> Default Address: </p>

                    <p className="font-medium my-3">
                      {defaultAddress?.name}{" "}
                      <span className="pl-4">{defaultAddress?.mobileNum}</span>
                    </p>
                    <p>
                      {defaultAddress?.fullAddress}, {defaultAddress?.city},{" "}
                      {defaultAddress?.state}
                    </p>
                    <p className="font-medium">{defaultAddress?.pincode}</p>
                  </div>
                ) : (
                  <p>Select Address</p>
                )}
                <Address_List />
              </div>
            </div>
          </div>
          <div className=" mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <Order_Summary />
            {/* <button
              className="flex w-full items-center justify-center rounded-lg text-white bg-blue-700 px-5 py-2.5 text-sm font-medium  hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              onClick={placeOrderHandler}
            >
              Place Order
            </button> */}
            <Payment newOrder={newOrder} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout_Page;
