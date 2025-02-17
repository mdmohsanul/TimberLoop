import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  setCheckBoxFilter,
  setSortBy,
  setAssuredFilter,
  setRatingFilter,
  setRangeFilter,
} from "../../features/productSlice";
import { setStickyBottom } from "../../features/footerSlice";
import Assured_Checkbox_Filter from "./Assured_Checkbox_Filter";
import Sort_By_Filter from "./Sort_By_Filter";
import Category_Filter from "./Category_Filter";
import Range_Filter from "./Range_Filter";
import Rating_Filter from "./Rating_Filter";

const Product_Filters = ({ categoryName, footerRef, setNav }) => {
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState([
    categoryName === undefined ? "All" : categoryName,
  ]);
  const [selectedSortBy, setSelectedSortBy] = useState("Relevance");
  const [assured, setAssured] = useState();
  const [selectedRating, setSelectedRating] = useState([]);
  const [rangevalue, setRangevalue] = useState("");

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

  const rangeHandler = (e) => {
    setRangevalue(e.target.value);
  };
  useEffect(() => {
    dispatch(setCheckBoxFilter(selectedCategory));
    dispatch(setSortBy(selectedSortBy));
    dispatch(setAssuredFilter(assured));
    dispatch(setRatingFilter(selectedRating));
    dispatch(setRangeFilter(rangevalue));
    // dispatch(setSearchFilter(searchTerm));
  }, [selectedCategory, selectedSortBy, assured, selectedRating, rangevalue]);
  return (
    <>
      <div className="max-w-7xl mx-auto hidden lg:flex">
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
          <Assured_Checkbox_Filter setAssured={setAssured} />
          <Sort_By_Filter setSelectedSortBy={setSelectedSortBy} />
        </div>
        <div className="flex ">
          <div
            className={`w-56 h-screen min-h-72  left-10 fixed bottom-0 top-[107px] overflow-y-auto transition-all my-4 pr-3 border-r-8 border-slate-400 `}
          >
            <Category_Filter
              selectedCategory={selectedCategory}
              categoryHandler={categoryHandler}
            />
            <Range_Filter rangevalue={rangevalue} rangeHandler={rangeHandler} />
            <Rating_Filter ratingHandler={ratingHandler} />
          </div>
        </div>
      </div>

      {/* mobile filters */}
      <div className="md:hidden">
        <div className="flex justify-between items-center mb-5 mr-6">
          <button
            className="bg-blue-600 text-white px-4 py-2 text-sm "
            onClick={() => setNav(false)}
          >
            Apply Filters
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 text-sm"
            onClick={clearHandler}
          >
            Clear
          </button>
        </div>
        <Sort_By_Filter setSelectedSortBy={setSelectedSortBy} />
        <Category_Filter
          selectedCategory={selectedCategory}
          categoryHandler={categoryHandler}
        />
        <Range_Filter rangevalue={rangevalue} rangeHandler={rangeHandler} />
        <Rating_Filter ratingHandler={ratingHandler} />
        <Assured_Checkbox_Filter setAssured={setAssured} className="sm:mt-5" />
      </div>
    </>
  );
};

export default Product_Filters;
