import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Product_Card from "../components/Product_Card";
import Product_Filters from "../components/Product_Filters";
import ShimerUI_ProductsPage from "../components/ShimmerUI/ShimerUI_ProductsPage";
import { fetchProducts, setCheckBoxFilter } from "../features/productSlice";

const Product = () => {
  const { productName } = useParams();
  const dispatch = useDispatch();

  const {
    products,
    status,
    error,
    checkBoxFilter,
    sortFilter,
    assuredFilter,
    ratingFilter,
    searchFilter,
  } = useSelector((state) => state.products);
  console.log(searchFilter);
  const productsLists = checkBoxFilter.includes("All")
    ? products?.products
    : products?.products?.filter((product) =>
        checkBoxFilter.includes(product.category)
      );

  const sortedProducts =
    productsLists === undefined
      ? []
      : [...productsLists].slice().sort((a, b) => {
          if (sortFilter === "Relevance") return true;
          if (sortFilter === "lowToHigh") return a?.price - b?.price;
          if (sortFilter === "highToLow") return b?.price - a?.price;
          return 0;
        });

  const assuredProducts =
    assuredFilter !== true
      ? sortedProducts
      : sortedProducts.filter((product) => product.timber_assured === true);

  const ratingFilterProduct =
    ratingFilter.length === 0
      ? assuredProducts
      : assuredProducts.filter((product) =>
          ratingFilter.some((item) => item <= product.rating)
        );
  const searchedProducts = products?.products?.filter((product) =>
    product.category
      .toLowerCase()
      .includes(
        searchFilter.toLowerCase() ||
          product.name.toLowerCase().includes(searchFilter.toLowerCase())
      )
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);
  return (
    <>
      {status === "loading" && <ShimerUI_ProductsPage />}
      {error && <p>{error}</p>}
      {status === "success" && (
        <div className="relative pt-16 min-h-screen ">
          <div className="bg-[#FAFAFA] hidden sticky top-16 z-10 lg:flex">
            <p>{ratingFilterProduct.length}</p>
            <Product_Filters productName={productName} />
          </div>

          <div className="lg:pl-72">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 xl:ml-5">
              {(searchFilter == []
                ? ratingFilterProduct
                : searchedProducts
              ).map((product) => (
                <Product_Card key={product._id} product={product} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
