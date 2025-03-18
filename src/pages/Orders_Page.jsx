import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrder } from "../features/orderSlice";
import ShimerUI_ProductsPage from "../components/ShimmerUI/ShimerUI_ProductsPage";
import Empty_Products from "../components/Empty_Products";
const Orders_Page = () => {
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.userLogIn);

  useEffect(() => {
    dispatch(fetchOrder(user?._id));
  }, [dispatch]);

  return (
    <>
      <section className="w-full min-h-screen  pt-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center md:text-3xl text-2xl font-medium text-gray-700 py-2">
            Orders{" "}
            <span className="md:text-2xl text-xl">({orders.length})</span>
          </h2>

          {status === "loading" && <ShimerUI_ProductsPage />}
          {orders?.length === 0 && <Empty_Products name="order" />}
          {/* {error && <p>{error}</p>} */}
          {/* {status === "error" && <p>{error}</p>} */}
          {status === "success" &&
            orders?.map((item) => (
              <div
                key={item._id}
                className="border border-slate-300 rounded-md mb-6 p-4 mx-3 md:mx-0"
              >
                <div className="border-b border-gray-300 mb-3 pb-3 text-sm md:text-lg">
                  <p className="text-gray-600 ">
                    <span className="font-semibold text-gray-700">
                      Order ID:{" "}
                    </span>{" "}
                    OD{item?._id}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold text-gray-700">
                      Order Date:{" "}
                    </span>{" "}
                    {item?.createdAt}
                  </p>
                </div>

                {item.products.map((product) => (
                  <div
                    key={product._id}
                    className="  mb-4 md:p-4  flex justify-start md:gap-6 gap-3"
                  >
                    <img
                      src={`https://i.pinimg.com/${product?.productId?.image}`}
                      alt="productImage"
                      className="md:w-24 md:h-20 w-16 h-12"
                    />

                    <div className=" flex flex-col flex-1 text-gray-700">
                      <span className="font-semibold">
                        {product?.productId?.name}
                      </span>
                      <span className="text-sm">
                        By {product?.productId?.brand_name}
                      </span>
                      <span className="text-sm text-gray-500">
                        Qty: {product?.quantity}
                      </span>
                    </div>
                    <p className="font-medium md:pr-10  flex flex-col">
                      <span className="text-gray-800">
                        ₹ {product?.price.toFixed(2)}
                      </span>
                      <span className="line-through text-gray-500">
                        ₹ {product?.productId?.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-red-500">
                        {product?.productId?.discount}% Off
                      </span>
                    </p>
                  </div>
                ))}
                <p className="border-t border-gray-300 py-4 text-gray-600">
                  <span className="font-semibold text-gray-800">
                    Total Amount Paid:{" "}
                  </span>{" "}
                  ₹ {(item.totalPrice + 399 + 799).toFixed()}
                </p>
                <p className="text-red-500">
                  You Saved ₹
                  {(
                    item?.products?.reduce(
                      (sum, curr) =>
                        sum + curr?.productId?.price * curr?.quantity,
                      0
                    ) - item.totalPrice
                  ).toFixed(2)}{" "}
                  in this order.
                </p>
              </div>
            ))}
        </div>
      </section>
    </>
  );
};

export default Orders_Page;
