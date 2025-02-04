import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addWishlistProduct } from "../features/wishlistSlice";

const useWishlistHandler = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { wishlistProducts } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.userLogIn);

  const handleWishlist = (productId, setCheckWishlistProduct) => {
    if (localStorage.getItem("adminToken")) {
      const isInWishList = wishlistProducts
        .map((item) => item._id)
        .includes(productId);
      if (!isInWishList) {
        const wishlistDetails = {
          userId: user?.user?._id,
          productId: productId,
        };
        setCheckWishlistProduct(productId);
        dispatch(addWishlistProduct(wishlistDetails));
      } else {
        toast.error("Product already in wishlist!");
      }
    } else {
      navigate("/login");
    }
  };
  return handleWishlist;
};

export default useWishlistHandler;
