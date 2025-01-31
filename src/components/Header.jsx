import React, { useState, useEffect } from "react";
import Timber_Logo from "/Timber_logo.webp";
import { CiSearch } from "react-icons/ci";
import { BsPerson } from "react-icons/bs";
import { IoIosHeartEmpty } from "react-icons/io";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchFilter } from "../features/productSlice";
import { setTotalProducts } from "../features/cartSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartProducts, status } = useSelector((state) => state.cart);
  const { wishlistProducts } = useSelector((state) => state.wishlist);

  const [searchTerm, setSearchTerm] = useState("");
  const [nav, setNav] = useState(false);
  const handleInputChange = (value) => {
    navigate("/products");
    setSearchTerm(value);
  };

  useEffect(() => {
    dispatch(setSearchFilter(searchTerm));
  }, [searchTerm]);
  return (
    <>
      <div className="w-full fixed top-0 bg-white z-30 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <div className="max-w-[1200px] mx-auto ">
          <div className="flex justify-between items-center">
            <Link to="/">
              <img
                loading="lazy"
                src={Timber_Logo}
                alt="Timber_Logo"
                className="h-16 w-44 md:h-16 md:w-52 pl-4 md:pl-0 pt-2"
              />
            </Link>
            <div className="hidden md:flex relative ">
              <div className="absolute end-0 inset-y-0 flex items-center ps-3 pointer-events-none">
                <CiSearch className="text-slate-500 font-semibold" size={20} />
              </div>
              <input
                type="text"
                name=""
                value={searchTerm}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder={`Search`}
                className="py-2 pr-4  hover:outline-none outline-none  border-b border-slate-600"
              />
            </div>
            <div className="hidden md:flex justify-between items-center gap-9">
              <Link to="/login">
                <BsPerson size={30} className="text-slate-700" />
              </Link>
              <Link to="/wishlist" className="relative">
                {" "}
                <IoIosHeartEmpty size={30} className="text-slate-700" />
                {status === "success" && (
                  <p className="bg-gray-800 text-white absolute -top-2 -right-1 m-0 px-[2px] rounded-md">
                    {wishlistProducts?.length}
                  </p>
                )}
              </Link>
              <Link to="/cart" className="relative">
                {" "}
                <PiShoppingCartSimpleLight
                  size={30}
                  className="text-slate-700 "
                />
                {status === "success" && (
                  <p className="bg-gray-800 text-white absolute -top-2 -right-1 m-0 px-[2px] rounded-md">
                    {cartProducts?.length}
                  </p>
                )}
              </Link>
            </div>
            <div className="md:hidden cursor-pointer text-black   mr-5">
              <div onClick={() => setNav(!nav)}>
                {nav ? (
                  <FaTimes size={30} className="text-slate-700" />
                ) : (
                  <FaBars size={30} className="text-slate-700" />
                )}

                {/* Mobile Menu */}

                {/* one more way to do */}
                {/* nav &&  */}
                <ul
                  className={`
        md:hidden bg-white z-10 fixed w-full md:w-fit sm:w-fit text-xl top-16 overflow-y-auto bottom-0 py-16  pl-4
        duration-500 ${nav ? "left-0" : "left-[-100%]"}
        `}
                >
                  <div className="flex flex-col justify-between items-center gap-9 pt-2">
                    <div className=" relative inline-block ">
                      <div className="absolute end-0 inset-y-0 flex items-center ps-3 pointer-events-none">
                        <CiSearch
                          className="text-slate-500 font-semibold"
                          size={20}
                        />
                      </div>
                      <input
                        type="text"
                        name=""
                        value={searchTerm}
                        onChange={handleInputChange}
                        placeholder={`Search`}
                        className="py-2 pr-4  hover:outline-none outline-none  border-b border-slate-600"
                      />
                    </div>
                    <Link to="/login">
                      {" "}
                      <span className="flex items-center gap-4">
                        <BsPerson size={30} className="text-slate-700" />
                        Sign Up
                      </span>
                    </Link>{" "}
                    <Link to="/wishlist">
                      {" "}
                      <span className="flex items-center gap-4">
                        <IoIosHeartEmpty size={30} className="text-slate-700" />
                        WishList
                      </span>
                    </Link>
                    <Link to="/cart">
                      {" "}
                      <span className="flex items-center gap-4">
                        <PiShoppingCartSimpleLight
                          size={30}
                          className="text-slate-700"
                        />
                        Cart
                      </span>
                    </Link>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
