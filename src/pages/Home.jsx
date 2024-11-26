import React from "react";
import Home_Top_Banner from "../components/Home_Top_Banner";
import Product_Category from "../components/Product_Category";

const Home = () => {
  return (
    <>
      <div className="max-w-[1200px] mx-auto">
        <Home_Top_Banner />
        <Product_Category />
      </div>
    </>
  );
};

export default Home;
