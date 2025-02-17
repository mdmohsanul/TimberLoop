import React from "react";
import { GoHomeFill } from "react-icons/go";
import { FaUser } from "react-icons/fa";
import { IoIosHeart } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Bottom_Menu = () => {
  const { cartProducts, status } = useSelector((state) => state.cart);
  const { wishlistProducts } = useSelector((state) => state.wishlist);
  return (
    <>
      <div className="fixed bottom-0 right-0 h-12 bg-white w-full md:hidden z-50 border-t border-gray-900">
        <div className="flex items-center justify-between mx-5 py-3 text-gray-700 relative">
          <Link to="/" className=" active:text-blue-600">
            <GoHomeFill size={28} />
          </Link>
          <Link to="/userProfile" className="active:text-blue-600">
            <FaUser size={25} />
          </Link>
          <Link to="/wishlist">
            <IoIosHeart size={28} />
          </Link>
          <Link to="/cart">
            <FaCartShopping size={27} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Bottom_Menu;
