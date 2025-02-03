import React, { useState, useEffect, useRef } from "react";
import { category, ratingIcon } from "../data/product";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  setCheckBoxFilter,
  setSortBy,
  setAssuredFilter,
  setRatingFilter,
  setRangeFilter,
} from "../features/productSlice";
import { setStickyBottom } from "../features/footerSlice";

const Product_Filters = ({ categoryName, footerRef }) => {
  const dispatch = useDispatch();
  const filterRef = useRef(null);
  const { isStickyBottom } = useSelector((state) => state.footer);
  console.log(isStickyBottom);
  const [selectedCategory, setSelectedCategory] = useState([
    categoryName === undefined ? "All" : categoryName,
  ]);
  const [selectedSortBy, setSelectedSortBy] = useState("Relevance");
  const [assured, setAssured] = useState();
  const [selectedRating, setSelectedRating] = useState([]);
  const [rangevalue, setRangevalue] = useState("");

  // footer scroll condition
  useEffect(() => {
    const handleScroll = () => {
      if (filterRef.current && footerRef.current) {
        const filterBottom = filterRef.current.getBoundingClientRect().bottom;
        const footerTop = footerRef.current.getBoundingClientRect().top;

        dispatch(setStickyBottom(filterBottom >= footerTop));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch]);

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
            <label
              className="inline-flex items-center cursor-pointer"
              htmlFor="timberAssured"
            >
              <input
                type="checkbox"
                name="timberAssured"
                id="timberAssured"
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
            <label htmlFor="sortBy" className="text-[16px] pr-2  text-gray-900">
              Sort By:
            </label>
            <select
              name="sortBy"
              id="sortBy"
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
          <div
            ref={filterRef}
            className={`w-56 h-screen min-h-72  left-10 fixed bottom-0 top-[107px] overflow-y-auto transition-all my-4 pr-3 border-r-8 border-slate-400 ${
              isStickyBottom ? " " : ""
            }`}
          >
            <label
              htmlFor="category"
              className="font-medium text-lg text-slate-800 "
            >
              Category
            </label>
            <br />
            {category.map((item) => (
              <div key={item.id}>
                <input
                  type="checkbox"
                  name="category"
                  id={`category-${item.id}`}
                  className="mr-2 "
                  value={item.value}
                  checked={selectedCategory.includes(item.value)}
                  onChange={categoryHandler}
                />
                <span className="text-slate-500 text-[16px]">{item.name}</span>
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
              <input
                type="range"
                id="price"
                name="price"
                min="5000"
                max="100000"
                value={rangevalue}
                onChange={rangeHandler}
              />
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
                  id={`rating-${item.id}`}
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
