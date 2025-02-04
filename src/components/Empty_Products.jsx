import React from "react";
import { BsCartX } from "react-icons/bs";
import { BsClipboardHeart } from "react-icons/bs";
import { Link } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";

const Empty_Products = ({ name }) => {
  return (
    <>
      <div className="flex flex-col gap-6 items-center justify-center min-h-screen ">
        {name === "cart" ? (
          <BsCartX size={50} />
        ) : (
          <BsClipboardHeart size={50} />
        )}
        <p className="text-2xl">Your {name} is empty</p>
        <Link
          to="/products"
          className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer rounded-md py-3 px-5 flex items-center justify-center"
        >
          {name === "cart" ? (
            <span className="">Start Shopping</span>
          ) : (
            <span className="">Add Fav Products</span>
          )}
          <span>
            {" "}
            <IoIosArrowRoundForward size={30} />
          </span>
        </Link>
      </div>
    </>
  );
};

export default Empty_Products;
