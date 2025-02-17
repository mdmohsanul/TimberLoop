import React from "react";
import { category } from "../../data/product";

const Category_Filter = ({ selectedCategory, categoryHandler }) => {
  return (
    <>
      <label htmlFor="category" className="font-medium text-lg text-slate-800 ">
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
    </>
  );
};

export default Category_Filter;
