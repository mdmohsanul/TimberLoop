import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addProduct } from "../features/cartSlice";

const useCartHandler = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartProducts } = useSelector((state) => state.cart);

  const { user } = useSelector((state) => state.userLogIn);

  const handleCart = async (productId, setCheckProduct, quantity = 1) => {
    if (localStorage.getItem("token")) {
      const isInCart = cartProducts
        .map((item) => item.productId._id)
        .includes(productId);

      if (!isInCart) {
        const cartDetails = {
          userId: user?._id,
          productId: productId,
          quantity: quantity,
        };
        setCheckProduct(productId);

        await dispatch(addProduct(cartDetails)).unwrap();
        toast.success("Product added to cart!", {
          autoClose: 1000,
        });
      } else {
        toast.error("Product already in cart!", {
          autoClose: 1000,
        });
      }
    } else {
      navigate("/login");
    }
  };
  return handleCart;
};

export default useCartHandler;
