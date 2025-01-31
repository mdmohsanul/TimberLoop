import React from "react";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addProduct } from "../features/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { removeWishListProduct } from "../features/wishlistSlice";

const Wishlist_Product_Card = ({ product }) => {
  const dispatch = useDispatch();
  const { cartProducts } = useSelector((state) => state.cart);
  const { wishlistProducts } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.userLogIn);

  const cartHandler = (productId) => {
    console.log("productId", productId);
    console.log("cartProducts", cartProducts);
    const isInCart = cartProducts
      .map((item) => item.productId)
      .includes(productId);
    console.log(isInCart);
    if (!isInCart) {
      const cartDetails = {
        userId: user?.user?._id,
        productId: productId,
        quantity: 1,
      };
      //   setCheckProduct(productId);
      dispatch(addProduct(cartDetails));
    } else {
      toast.error("Product already in cart!");
    }
  };
  const productRemoveHandler = (productId) => {
    const userId = user?.user?._id;
    dispatch(removeWishListProduct({ userId, productId }));
  };
  const productDiscountPrice = (
    product.price -
    (product.price * product.discount) / 100
  ).toFixed(2);
  return (
    <>
      <div className="mx-8 md:mx-0 md:w-[260px] h-[340px] relative hover:shadow-[0px_16px_28px_10px_#00000024] shadow-[0px_10px_11px_0px_#00000024] transition duration-500 cursor-pointer ">
        <ToastContainer />
        <Link to={`/products/${product._id}`} key={product._id}>
          <div className="group">
            <div>
              <img
                src={`https://i.pinimg.com/${product?.image}`}
                alt="productImage"
                className="w-full  h-52 transition-transform duration-700 ease-out group-hover:scale-95"
              />
            </div>
            <div className="pt-4 px-2 relative">
              <h5 className="text-[#212121] text-[16px] truncate">
                {product?.name}
              </h5>

              <p className=" text-green-600">
                {product?.timber_assured ? "Assured" : ""}
              </p>

              <p className="text-[16px] ">
                <span className="font-semibold">₹{productDiscountPrice} </span>
                <span className="text-[14px] line-through text-[#878792] ">
                  ₹{product?.price}
                </span>
                <span className="text-[13px] text-[#388E48]">
                  {product?.discount}% off
                </span>
              </p>
            </div>
          </div>
        </Link>
        <div className="flex items-center justify-center absolute bottom-0 w-full   cursor-pointer">
          <button
            className="flex items-center justify-center gap-2 bg-blue-600 border-t-[1px] border-blue-600  hover:bg-blue-700 w-2/4 py-1 text-white "
            onClick={() => cartHandler(product._id)}
          >
            <HiOutlineShoppingCart />
            Add To Cart
          </button>
          <button
            className="flex items-center justify-center gap-3 w-2/4 hover:border-t-[1px] hover:border-gray-300 
             border-t-[1px] border-gray-300 py-1 hover:bg-red-500 hover:text-white"
            onClick={() => productRemoveHandler(product._id)}
          >
            Remove
          </button>
        </div>
      </div>
    </>
  );
};

export default Wishlist_Product_Card;
