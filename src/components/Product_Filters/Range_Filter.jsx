import React from "react";

const Range_Filter = ({ rangevalue, rangeHandler }) => {
  return (
    <>
      <div className="py-4">
        <label htmlFor="price" className="font-medium text-slate-800 pt-6">
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
    </>
  );
};

export default Range_Filter;
