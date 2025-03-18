import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addWishlistProduct, fetchWishlist } from "../features/wishlistSlice";

const useWishlistHandler = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { wishlistProducts } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.userLogIn);

  const handleWishlist = async (productId, setCheckWishlistProduct) => {
    if (localStorage.getItem("adminToken")) {
      const isInWishList = wishlistProducts
        .map((item) => item._id)
        .includes(productId);
      if (!isInWishList) {
        const wishlistDetails = {
          userId: user?._id,
          productId: productId,
        };
        setCheckWishlistProduct(productId);
        await dispatch(addWishlistProduct(wishlistDetails)).unwrap();
        toast.success("Product added to wishlist!", {
          autoClose: 1000,
        });
      } else {
        toast.error("Product already in wishlist!", {
          autoClose: 1000,
        });
      }
    } else {
      navigate("/login");
    }
  };
  return handleWishlist;
};

export default useWishlistHandler;
