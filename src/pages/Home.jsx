import React from "react";
import { Link } from "react-router-dom";
import Home_Top_Banner from "../components/Home_Top_Banner";
import Product_Category from "../components/Product_Category";

const Home = () => {
  return (
    <>
      <div className=" min-h-screen">
        <div className="max-w-[1200px] mx-auto">
          <Home_Top_Banner />
          <Product_Category />
          <div className="flex items-center justify-center py-5">
            <Link to="/api/products">
              <button className="py-2 px-4 bg-orange-300 rounded-md">
                View All Products
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
