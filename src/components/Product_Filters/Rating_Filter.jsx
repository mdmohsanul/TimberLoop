import React from "react";
import { ratingIcon } from "../../data/product";

const Rating_Filter = ({ ratingHandler }) => {
  return (
    <>
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
    </>
  );
};

export default Rating_Filter;
