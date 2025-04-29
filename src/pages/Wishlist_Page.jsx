import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Empty_Products from "../components/Empty_Products";
import ShimerUI_ProductsPage from "../components/ShimmerUI/ShimerUI_ProductsPage";
import Wishlist_Product_Card from "../components/Wishlist_Product_Card";
import { fetchWishlist } from "../features/wishlistSlice";

const Wishlist_Page = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userLogIn);
  const { status, error, wishlistProducts } = useSelector(
    (state) => state.wishlist
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    if (user?._id) {
      dispatch(fetchWishlist(user._id));
    }
  }, [dispatch, user?._id]);

  if (status === "loading")
    return (
      <>
        <ShimerUI_ProductsPage />
      </>
    );
  if (status === "failed") return <>{error}</>;

  return (
    <>
      <section className="w-full min-h-screen pt-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center md:text-3xl text-2xl font-medium text-gray-700 py-2">
            Wishlist{" "}
            <span className="md:text-2xl text-xl">
              ({wishlistProducts?.length})
            </span>
          </h2>
          {wishlistProducts?.length === 0 && <Empty_Products name="wishlist" />}
          <div className="pt-4 pb-7 grid gap-y-7 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 md:justify-items-center">
            {wishlistProducts?.map((item) => (
              <Wishlist_Product_Card key={item?._id} product={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Wishlist_Page;
