import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrder } from "../features/orderSlice";
import ShimerUI_ProductsPage from "../components/ShimmerUI/ShimerUI_ProductsPage";

const Orders_Page = () => {
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.userLogIn);

  console.log(orders);
  useEffect(() => {
    dispatch(fetchOrder(user?.user?._id));
  }, []);
  return (
    <>
      <section className="w-full min-h-screen  pt-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center md:text-3xl text-2xl font-medium text-gray-700 py-2">
            Orders
          </h2>

          {status === "loading" && <ShimerUI_ProductsPage />}
          {status === "error" && <p>{error}</p>}
          {status === "success" && orders?.length === 0 ? (
            <Empty_Products name="order" />
          ) : (
            orders?.map((item) => (
              <div
                key={item._id}
                className="border border-slate-300 rounded-md mb-3 p-4"
              >
                <div className="border-b border-gray-300 mb-3 pb-3">
                  <p className="text-gray-600">
                    <span className="font-semibold text-gray-700">
                      Order ID:{" "}
                    </span>{" "}
                    OD{item._id}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold text-gray-700">
                      Order Date:{" "}
                    </span>{" "}
                    {item.createdAt}
                  </p>
                </div>

                {item.products.map((product) => (
                  <div
                    key={product._id}
                    className=" grid grid-cols-6 mb-2 gap-10 pb-2"
                  >
                    <img
                      src={`https://i.pinimg.com/${product?.productId?.image}`}
                      alt="productImage"
                      className="w-24 h-20"
                    />

                    <div className="col-span-5 flex justify-between ">
                      <div className="place-self-start flex flex-col text-gray-700">
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
                      <p className="font-medium pr-10 flex flex-col">
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
                  </div>
                ))}
                <p className="border-t border-gray-300 py-4 text-gray-600">
                  <span className="font-semibold text-gray-800">
                    Total Amount Paid:{" "}
                  </span>{" "}
                  ₹ {item.totalPrice}
                </p>
                <p className="text-red-500">
                  You Saved{" "}
                  {(
                    item?.products?.reduce(
                      (sum, curr) => sum + curr?.productId?.price,
                      0
                    ) - item.totalPrice
                  ).toFixed(2)}{" "}
                  in this order.
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default Orders_Page;
