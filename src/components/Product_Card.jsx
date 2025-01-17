import React from "react";
import { FaStar } from "react-icons/fa6";
import { IoHeartSharp } from "react-icons/io5";

const Product_Card = ({ product }) => {
  const productDiscountPrice = (
    product.price -
    (product.price * product.discount) / 100
  ).toFixed(2);
  return (
    <>
      <div className="w-48 md:w-64 h-auto m-3 hover:shadow-[0px_16px_28px_10px_#00000024] shadow-[0px_10px_11px_0px_#00000024] p-3 transition duration-500 cursor-pointer ">
        <img
          src={`https://i.pinimg.com/${product?.image}`}
          alt=""
          //   className="w-full h-52 transform transition duration-500 hover:scale-95"
          className="w-full md:h-52 h-44 "
        />
        <div className="pt-4 relative">
          <h5 className="text-[#212121] text-sm">{product?.name}</h5>
          <p className="text-[#878787]">By {product?.brand_name}</p>
          <div className="py-3 flex  border-b-[1px]">
            <div className="flex items-center justify-center  bg-red-600 text-white py-[2px] px-2 gap-1 rounded-[4px] ">
              <span className="  text-[12px] ">{product?.rating}</span>
              <span>
                {" "}
                <FaStar className="text-[12px]" />
              </span>
            </div>

            <span className="pl-5">
              {product?.timber_assured ? "Assured" : ""}
            </span>
          </div>
          <p className="text-[16px] py-3">
            <span className="font-semibold">₹{productDiscountPrice} </span>
            <span className="text-[14px] line-through text-[#878792] px-2">
              ₹{product?.price}
            </span>
            <span className="text-[13px] text-[#388E48]">
              {product?.discount}% off
            </span>
          </p>
          <span className="md:p-[5px] p-[3px] text-gray-600 hover:text-white absolute top-[-18px] right-4 bg-slate-200 rounded-full bg-opacity-60 hover:bg-black  hover:bg-opacity-55 transform transition duration-500">
            <IoHeartSharp size={27} />
          </span>
        </div>
      </div>
    </>
  );
};

export default Product_Card;
