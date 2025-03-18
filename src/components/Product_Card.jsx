import React, { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { IoHeartSharp } from "react-icons/io5";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useCartHandler from "../hooks/useCartHandler";
import useWishlistHandler from "../hooks/useWishlistHandler";

const Product_Card = ({ product }) => {
  const navigate = useNavigate();
  const [checkProduct, setCheckProduct] = useState("");
  const [checkWishlistProduct, setCheckWishlistProduct] = useState("");

  const handleCart = useCartHandler();
  const handleWishlist = useWishlistHandler();

  const productDiscountPrice = (
    product.price -
    (product.price * product.discount) / 100
  ).toFixed(2);
  return (
    <>
      <div className="w-44 md:w-[250px] h-96 relative hover:shadow-[0px_16px_28px_10px_#00000024] shadow-[0px_10px_11px_0px_#00000024] transition duration-500 cursor-pointer ">
        <ToastContainer />
        <Link to={`/products/${product._id}`} key={product._id}>
          {" "}
          <div className="group">
            <div>
              <img
                src={`https://i.pinimg.com/${product?.image}`}
                alt="productImage"
                //   className="w-full h-52 transform transition duration-500 hover:scale-95"
                className="w-full md:h-52 h-44 transition-transform duration-700 ease-out group-hover:scale-95"
              />
            </div>
            <div className="pt-4 px-2 ">
              <h5 className="text-[#212121] text-[16px] truncate">
                {product?.name}
              </h5>
              <p className="text-[#878787] text-sm ">
                By {product?.brand_name}
              </p>
              <div className="py-2 flex items-center justify-start  border-b-[1px]">
                <div className="flex flex-wrap items-center justify-center  bg-red-600 text-white py-[2px] px-2 gap-1 rounded-[4px] ">
                  <p className="  text-[12px] ">{product?.rating}</p>

                  <FaStar className="text-[12px]" />
                </div>

                <p className="pl-5 text-green-600">
                  {product?.timber_assured ? "Assured" : ""}
                </p>
              </div>
              <p className="text-[16px] py-2">
                <span className="font-semibold">₹{productDiscountPrice} </span>
                <span className="text-[14px] line-through text-[#878792] px-2">
                  ₹{product?.price}
                </span>
                <span className="text-[13px] text-[#388E48]">
                  {product?.discount}% off
                </span>
              </p>
            </div>
          </div>
        </Link>
        <button
          className="md:p-[5px] p-[3px] text-gray-600 hover:text-white absolute top-5 right-4 bg-slate-200 rounded-full bg-opacity-60 hover:bg-black  hover:bg-opacity-55 transform transition duration-500 disabled:bg-gray-600 disabled:text-slate-200"
          onClick={() => handleWishlist(product?._id, setCheckWishlistProduct)}
          disabled={checkWishlistProduct === product?._id}
        >
          <IoHeartSharp size={27} />
        </button>
        <div className="flex items-center justify-center absolute bottom-0  w-full bg-blue-600 hover:bg-blue-700 py-1 text-white cursor-pointer">
          <button
            type="button"
            className="flex items-center justify-center gap-3"
            onClick={() => {
              checkProduct === product._id
                ? navigate("/cart")
                : handleCart(product?._id, setCheckProduct);
            }}
          >
            <HiOutlineShoppingCart />

            {checkProduct === product._id ? "Go To Cart" : "Add To Cart"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Product_Card;
