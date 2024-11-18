import React, { useState } from "react";
import Timber_Logo from "/Timber_logo.webp";
import { CiSearch } from "react-icons/ci";
import { BsPerson } from "react-icons/bs";
import { IoIosHeartEmpty } from "react-icons/io";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [nav, setNav] = useState(false);
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <>
      <div className="max-w-[1200px] mx-auto ">
        <div className="flex justify-between items-center">
          <img
            loading="lazy"
            src={Timber_Logo}
            alt="Timber_Logo"
            className="h-16 w-44 md:h-16 md:w-52 pl-4 md:pl-0 pt-2"
          />
          <div className="hidden md:flex relative ">
            <div className="absolute end-0 inset-y-0 flex items-center ps-3 pointer-events-none">
              <CiSearch className="text-slate-500 font-semibold" size={20} />
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
          <div className="hidden md:flex justify-between items-center gap-9">
            <BsPerson size={30} className="text-slate-700" />
            <IoIosHeartEmpty size={30} className="text-slate-700" />
            <PiShoppingCartSimpleLight size={30} className="text-slate-700 " />
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

                  <span className="flex items-center gap-4">
                    <BsPerson size={30} className="text-slate-700" />
                    Sign Up
                  </span>
                  <span className="flex items-center gap-4">
                    <IoIosHeartEmpty size={30} className="text-slate-700" />
                    WishList
                  </span>
                  <span className="flex items-center gap-4">
                    <PiShoppingCartSimpleLight
                      size={30}
                      className="text-slate-700"
                    />
                    Cart
                  </span>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
