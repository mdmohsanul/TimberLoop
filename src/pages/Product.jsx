import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { category, ratingIcon } from "../data/product";

const Product = () => {
  const { productName } = useParams();
  const [selectedCategory, setSelectedCategory] = useState([productName]);
  const [selectedRating, setSelectedRating] = useState([]);

  const categoryHandler = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setSelectedCategory((prev) => [...prev, value]);
    } else {
      setSelectedCategory((prev) =>
        selectedCategory.filter((item) => item != value)
      );
    }
  };
  const ratingHandler = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setSelectedRating((prev) => [...prev, value]);
    } else {
      setSelectedRating((prev) =>
        selectedRating.filter((item) => item != value)
      );
    }
  };
  const clearHandler = () => {
    setSelectedCategory([]);
    setSelectedRating([]);
  };

  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    const response = await fetch(
      "https://timber-backend.vercel.app/api/products"
    );
    const data = await response.json();
    console.log(data);
  }
  // console.log(selectedRating);
  // console.log(selectedCategory);
  return (
    <>
      <div className="max-w-7xl mx-auto pt-16">
        {/* <div className="h-16"></div> */}
        <div className=" w-60  my-4 pr-3 border-r-8 border-slate-400  rounded-t-lg ">
          <div className="flex items-center justify-between text-xl font-semibold text-slate-800 pb-3">
            <p>Filters</p>
            <button className="text-lg" onClick={clearHandler}>
              Clear
            </button>
          </div>
          <label htmlFor="category" className="font-semibold text-slate-800">
            Category
          </label>
          <br />
          {category.map((item) => (
            <div key={item.id}>
              <input
                type="checkbox"
                name="category"
                className="mr-2 "
                value={item.value}
                checked={selectedCategory.includes(item)}
                onChange={categoryHandler}
              />
              <span className="text-slate-500">{item.name}</span>
            </div>
          ))}
          <p>{selectedCategory}</p>
          <div className="py-4">
            <label
              htmlFor="price"
              className="font-semibold text-slate-800 pt-6"
            >
              Price
            </label>
            <br />
            <input type="range" name="" id="" />
          </div>

          <label htmlFor="rating" className="font-semibold text-slate-800">
            Rating
          </label>
          <br />
          {ratingIcon.map((item, i) => (
            <div className="flex" key={item.id}>
              <input
                type="checkbox"
                name="rating"
                className="mr-2 "
                value={ratingIcon.length - i}
                onChange={ratingHandler}
              />
              <span className="text-yellow-400 flex gap-1">{item.icon}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Product;
