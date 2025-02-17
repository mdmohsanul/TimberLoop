import React from "react";

const Sort_By_Filter = ({ setSelectedSortBy }) => {
  return (
    <>
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
    </>
  );
};

export default Sort_By_Filter;
