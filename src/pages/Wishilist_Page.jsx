import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Wishlist_Product_Card from "../components/Wishlist_Product_Card";
import { fetchWishlist } from "../features/wishlistSlice";

const Wishilist_Page = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userLogIn);
  const { status, error, wishlistProducts } = useSelector(
    (state) => state.wishlist
  );
  console.log("wishlistProducts", wishlistProducts);

  useEffect(() => {
    dispatch(fetchWishlist(user?.user?._id));
  }, [dispatch]);
  return (
    <>
      <div className="w-full min-h-screen pt-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-3xl font-medium text-gray-700 py-2">
            Wishlist
          </h2>
          <p>Home / Products / Wishlist</p>
          {status === "loading" && <p>Loading.....</p>}
          {error && <p>{error}</p>}
          {status === "success" && (
            <div className="py-4 grid gap-y-7 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 md:justify-items-center">
              {wishlistProducts?.map((item) => (
                <Wishlist_Product_Card product={item} key={item._id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Wishilist_Page;
