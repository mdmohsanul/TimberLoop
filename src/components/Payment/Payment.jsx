import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeAllProducts } from "../../features/cartSlice";
import { addOrder, fetchOrder } from "../../features/orderSlice";

const Payment = ({ newOrder }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartTotalPriceWithDelivery } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.userLogIn);

  // get payment value
  let payment = cartTotalPriceWithDelivery;
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    let data;
    try {
      const res = await fetch(
        "https://timber-backend.vercel.app/api/order/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: payment }),
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`API Error: ${res.status} - ${errorText}`);
      }

      data = await res.json();
    } catch (err) {
      console.error("Fetch failed:", err);
    }

    var options = {
      key: "rzp_test_OrR3hm4r2fnDlo",
      amount: payment, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Timber", //your business name
      description: "Test Transaction",
      // image: "https://example.com/your_logo",
      order_id: data?.orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        let orderDetails = {
          ...newOrder,
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
        };
        navigate("/cart/checkout/orderSummary");
        await dispatch(addOrder(orderDetails)).unwrap();
        await dispatch(fetchOrder(user?._id)).unwrap();
        dispatch(removeAllProducts(user?._id));

        // alert(`Signature: ${response.razorpay_signature}`);
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: "Gaurav Kumar", //your customer's name
        email: "gaurav.kumar@example.com",
        contact: "9000090000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    // add payment gateway new window every time...
    const rzp1 = new window.Razorpay(options);
    rzp1.on("payment failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
    });
    rzp1.open();
  };

  return (
    <>
      <button
        className="flex w-full items-center justify-center rounded-lg text-white bg-blue-700 px-5 py-2.5 text-sm font-medium  hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={handlePayment}
      >
        Place Order
      </button>
    </>
  );
};

export default Payment;
