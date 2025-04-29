import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartTotalWithDelivery } from "../features/cartSlice";

const Order_Summary = ({ deliveryCharges = true }) => {
  const dispatch = useDispatch();
  const { cartProducts, cartTotalPrice, cartTotalQuantity, cartTotalSavings } =
    useSelector((state) => state.cart);

  let deliveryPrice = cartProducts.length === 0 ? 0 : 399;
  let tax = cartProducts.length === 0 ? 0 : 799;
  const cartTotal = cartTotalPrice + deliveryPrice + tax;

  useEffect(() => {
    dispatch(getCartTotalWithDelivery(cartTotal));
  }, [cartTotal, dispatch]);
  return (
    <>
      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
        <p className="text-xl font-semibold text-gray-900 dark:text-white">
          Order summary
        </p>

        <div className="space-y-4">
          <div className="space-y-2">
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                Total ({cartTotalQuantity} items) :{" "}
              </dt>
              <dd className="text-base font-medium text-gray-900 dark:text-white">
                ₹ {cartTotalPrice.toFixed(2)}
              </dd>
            </dl>

            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                Savings
              </dt>
              <dd className="text-base font-medium text-green-600">
                - ₹ {cartTotalSavings.toFixed(2)}
              </dd>
            </dl>
            {deliveryCharges && (
              <div>
                <dl className="flex items-center justify-between gap-4">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Delivery Charges
                  </dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-white">
                    ₹ {deliveryPrice}
                  </dd>
                </dl>

                <dl className="flex items-center justify-between gap-4">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Tax
                  </dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-white">
                    ₹ {tax}
                  </dd>
                </dl>
              </div>
            )}
          </div>

          <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
            <dt className="text-base font-bold text-gray-900 dark:text-white">
              Total
            </dt>
            <dd className="text-base font-bold text-gray-900 dark:text-white">
              ₹{" "}
              {deliveryCharges
                ? cartTotal.toFixed(2)
                : cartTotalPrice.toFixed(2)}
            </dd>
          </dl>
          {deliveryCharges ? (
            ""
          ) : (
            <dd className="text-sm text-red-500">
              Delivery charges will be calculated at Checkout Page
            </dd>
          )}
        </div>
      </div>
    </>
  );
};

export default Order_Summary;
