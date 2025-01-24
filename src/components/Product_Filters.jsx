import React, { useState, useEffect, useCallback } from "react";
import { category, ratingIcon } from "../data/product";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  setCheckBoxFilter,
  setSortBy,
  setAssuredFilter,
  setRatingFilter,
  setSearchFilter,
} from "../features/productSlice";
import { CiSearch } from "react-icons/ci";

const Product_Filters = ({ productName }) => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState([
    productName === undefined ? "All" : productName,
  ]);
  const [selectedSortBy, setSelectedSortBy] = useState("Relevance");
  const [assured, setAssured] = useState();
  const [selectedRating, setSelectedRating] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const categoryHandler = (e) => {
    const { checked, value } = e.target;
    if (value === "All") {
      setSelectedCategory(checked ? ["All"] : []);
    } else {
      setSelectedCategory((prev) => {
        const isAllSelected = prev.includes("All");
        if (checked) {
          return isAllSelected ? [value] : [...prev, value];
        } else {
          const updatedList = prev.filter((item) => item !== value);
          return updatedList.length === 0 ? ["All"] : updatedList;
        }
      });
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
    dispatch(fetchProducts());
  };
  const searchHandler = (e) => {
    let searchText = e.target.value;

    setSearchTerm(searchText);
  };

  useEffect(() => {
    dispatch(setCheckBoxFilter(selectedCategory));
    dispatch(setSortBy(selectedSortBy));
    dispatch(setAssuredFilter(assured));
    dispatch(setRatingFilter(selectedRating));
    dispatch(setSearchFilter(searchTerm));
  }, [
    selectedCategory,
    selectedSortBy,
    assured,
    selectedRating,
    searchTerm,
    clearHandler,
  ]);
  return (
    <>
      <div className="max-w-7xl mx-auto ">
        <div className="grid grid-cols-12  items-center xl:gap-10 lg:gap-3 text-gray-900  py-2 font-medium">
          <div className="col-span-1">
            <p className="text-lg">Filter By</p>
          </div>
          <div className="col-span-2 place-self-center pr-7">
            {" "}
            <button className="text-lg " onClick={clearHandler}>
              Clear
            </button>
          </div>

          <div className="col-span-3 pt-3 place-self-start">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                onChange={(e) => setAssured(e.target.checked)}
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Timber Assured
              </span>
            </label>
          </div>
          <div className="col-span-3">
            <div className=" relative inline-block ">
              <div className="absolute  end-0 inset-y-0 flex items-center ps-3 pointer-events-none">
                <CiSearch className="text-slate-500 font-semibold" size={20} />
              </div>
              <input
                type="text"
                name=""
                value={searchTerm}
                onChange={searchHandler}
                placeholder={`Search`}
                className="py-2 pr-4  hover:outline-none outline-none bg-[#FAFAFA] border-b border-slate-600"
              />
            </div>
          </div>

          <div className="col-span-3">
            <label htmlFor="sortBy" className="text-[16px] pr-2  text-gray-900">
              Sort By:
            </label>
            <select
              name="sortBy"
              className="text-sm text-gray-500 py-1 hover:outline-none outline-none"
              onChange={(e) => setSelectedSortBy(e.target.value)}
            >
              <option value="Relevance">Relevance</option>
              <option value="lowToHigh">Price Low-To-High</option>
              <option value="highToLow">Price High-To-Low</option>
            </select>
          </div>
        </div>

        <div className="flex ">
          <div className=" w-60 h-screen min-h-72 fixed left-10 top-[107px] my-4 pr-3 border-r-8 border-slate-400   ">
            <label
              htmlFor="category"
              className="font-medium text-[16px] text-slate-800 "
            >
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
                  checked={selectedCategory.includes(item.value)}
                  onChange={categoryHandler}
                />
                <span className="text-slate-500 text-sm">{item.name}</span>
              </div>
            ))}

            <div className="py-4">
              <label
                htmlFor="price"
                className="font-medium text-slate-800 pt-6"
              >
                Price
              </label>
              <br />
              <input type="range" name="" id="" />
            </div>

            <label htmlFor="rating" className="font-medium text-slate-800">
              Rating
            </label>
            <br />
            {ratingIcon.map((item, i) => (
              <div className="flex items-center text-slate-600 " key={item.id}>
                <input
                  type="checkbox"
                  name="rating"
                  className="mr-2 "
                  value={item.ratingValue}
                  onChange={ratingHandler}
                />

                <span className="text-sm"> {item.ratingValue}</span>
                <span className=" flex gap-1 text-sm px-1">{item.icon}</span>
                <span className="text-sm">& above</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Product_Filters;
