import React, { useEffect } from "react";
import ShimmerProductCard from "./ShimmerProductCard";
import ShimmerSideBar from "./ShimmerSideBar";

const ShimerUI_ProductsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const shimmerCardDummyArr = [5, 12, 8, 19, 27, 33, 14, 6, 21, 9, 42, 17];
  return (
    <>
      <div className=" min-h-screen flex justify-around gap-3">
        <div className="hidden md:flex">
          <ShimmerSideBar />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-5">
          {shimmerCardDummyArr.map((item, i) => (
            <ShimmerProductCard key={i} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ShimerUI_ProductsPage;
