import React from "react";
import { productCategories } from "../data/productCategories";
import { Link } from "react-router-dom";

const Product_Category = () => {
  return (
    <>
      <div className="grid md:grid-cols-3 grid-cols-2 md:gap-y-24 md:py-16 px-5 pb-8 md:pb-5">
        {productCategories.map((item) => (
          <Link to={`products/${item.linkName}`} key={item.id}>
            <div className="flex flex-col items-center justify-center md:gap-12">
              <div className="relative flex h-[150px]  items-center justify-center from-slate-400 to-slate-100 before:absolute before:h-[115px] before:w-[115px] md:before:h-[230px] md:before:w-[230px] before:rounded-full before:bg-gradient-to-b">
                <div className=" relative flex h-[150px]  items-center justify-center  before:absolute before:h-[108px] before:w-[108px] md:before:h-[218px] md:before:w-[218px] before:rounded-full before:bg-white ">
                  <div className="relative flex h-[150px] flex-col gap-8 items-center justify-center from-slate-100 to-slate-400 before:absolute before:h-[100px] before:w-[100px] md:before:h-[210px] md:before:w-[210px] before:rounded-full before:bg-gradient-to-b ">
                    <img
                      className="z-10 md:h-60 md:w-72 h-32 w-36 transform transition duration-500 hover:scale-110"
                      src={item.imageSrc}
                      type="image"
                      alt={item.altText}
                    />{" "}
                  </div>
                </div>
              </div>
              <p className="text-lg md:text-xl text-slate-800 font-semibold">
                {item.name}
              </p>
            </div>{" "}
          </Link>
        ))}{" "}
      </div>{" "}
    </>
  );
};

export default Product_Category;
