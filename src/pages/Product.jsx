import React, { useState, useEffect, useLocation } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Product_Card from "../components/Product_Card";
import Product_Filters from "../components/Product_Filters";
import ShimerUI_ProductsPage from "../components/ShimmerUI/ShimerUI_ProductsPage";
import { fetchProducts, setCheckBoxFilter } from "../features/productSlice";

const Product = () => {
  const { categoryName } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    products,
    status,
    error,
    checkBoxFilter,
    sortFilter,
    assuredFilter,
    ratingFilter,
    searchFilter,
    rangeFilter,
  } = useSelector((state) => state.products);

  // search filter
  const searchedProducts = products?.filter((product) =>
    product.category
      .toLowerCase()
      .includes(
        searchFilter.toLowerCase() ||
          product.name.toLowerCase().includes(searchFilter.toLowerCase())
      )
  );

  const searchedProductsLists = checkBoxFilter.includes("All")
    ? searchedProducts
    : searchedProducts?.filter((product) =>
        checkBoxFilter.includes(product.category)
      );

  const searchSortedProducts =
    searchedProductsLists === undefined
      ? []
      : [...searchedProductsLists].slice().sort((a, b) => {
          if (sortFilter === "Relevance") return true;
          if (sortFilter === "lowToHigh")
            return (
              a.price -
              (a.price * a.discount) / 100 -
              (b.price - (b.price * b.discount) / 100)
            );
          if (sortFilter === "highToLow")
            return (
              b.price -
              (b.price * b.discount) / 100 -
              (a.price - (a.price * a.discount) / 100)
            );
          return 0;
        });

  const searchAssuredProducts =
    assuredFilter !== true
      ? searchSortedProducts
      : searchSortedProducts.filter(
          (product) => product.timber_assured === true
        );

  const searchRatingFilterProduct =
    ratingFilter.length === 0
      ? searchAssuredProducts
      : searchAssuredProducts.filter((product) =>
          ratingFilter.some((item) => item <= product.rating)
        );

  const searchRangeFilterProduct =
    rangeFilter === ""
      ? searchRatingFilterProduct
      : searchRatingFilterProduct.filter(
          (item) => item.price < parseInt(rangeFilter)
        );
  // route based filter
  const productsLists = checkBoxFilter.includes("All")
    ? products
    : products?.filter((product) => checkBoxFilter.includes(product.category));

  const sortedProducts =
    productsLists === undefined
      ? []
      : [...productsLists].slice().sort((a, b) => {
          if (sortFilter === "Relevance") return true;
          if (sortFilter === "lowToHigh")
            return (
              a.price -
              (a.price * a.discount) / 100 -
              (b.price - (b.price * b.discount) / 100)
            );
          if (sortFilter === "highToLow")
            return (
              b.price -
              (b.price * b.discount) / 100 -
              (a.price - (a.price * a.discount) / 100)
            );
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

  const rangeFilterProduct =
    rangeFilter === ""
      ? ratingFilterProduct
      : ratingFilterProduct.filter(
          (item) => item.price < parseInt(rangeFilter)
        );

  return (
    <>
      {status === "loading" && <ShimerUI_ProductsPage />}
      {error && <p>{error}</p>}
      {status === "success" && (
        <div className="relative pt-16 min-h-screen ">
          <div className="bg-[#FAFAFA] hidden sticky top-16 z-10 lg:flex">
            <p>{rangeFilterProduct.length}</p>
            <Product_Filters categoryName={categoryName} />
          </div>

          <div className="lg:pl-[279px] my-5 ">
            <div className="grid grid-cols-2 md:grid-cols-3 content-center justify-items-center lg:grid-cols-4 xl:grid-cols-4 gap-y-5">
              {(searchFilter == []
                ? rangeFilterProduct
                : searchRangeFilterProduct
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
