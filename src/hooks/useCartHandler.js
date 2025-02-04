import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addProduct } from "../features/cartSlice";

const useCartHandler = (productId) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartProducts } = useSelector((state) => state.cart);

  const { user } = useSelector((state) => state.userLogIn);

  const handleCart = (productId, setCheckProduct, quantity = 1) => {
    if (localStorage.getItem("adminToken")) {
      const isInCart = cartProducts
        .map((item) => item.productId._id)
        .includes(productId);

      if (!isInCart) {
        const cartDetails = {
          userId: user?.user?._id,
          productId: productId,
          quantity: quantity,
        };
        setCheckProduct(productId);

        dispatch(addProduct(cartDetails));
      } else {
        toast.error("Product already in cart!");
      }
    } else {
      navigate("/login");
    }
  };
  return handleCart;
};

export default useCartHandler;
