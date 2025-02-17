import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Product_Card from "../components/Product_Card";
import Product_Filters from "../components/Product_Filters/Product_Filters";
import ShimerUI_ProductsPage from "../components/ShimmerUI/ShimerUI_ProductsPage";
import { fetchProducts } from "../features/productSlice";
import { FaBars, FaTimes } from "react-icons/fa";

const Product = () => {
  /* 
   user can map to this page in 3 ways
   - by using searchbar
   - by selecting particular productcategory
   - by clicking on "View All Products" button
  */

  //  get parameter from URL
  const { categoryName } = useParams();
  const dispatch = useDispatch();
  const footerRef = useRef(null);
  const [nav, setNav] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // getting all state variables from productSlice
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
  console.log(products);
  // filters - if user come by searching product
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

  // filters - if a user comes by selecting product category
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
        <section className="relative pt-12 md:pt-16 min-h-screen ">
          {/* Desktop filters */}
          <div className="bg-[#FAFAFA] hidden sticky top-16 z-10 lg:flex">
            <Product_Filters
              categoryName={categoryName}
              footerRef={footerRef}
            />
          </div>
          {/* Mobile filters */}
          <div className="bg-white h-14 md:hidden fixed w-full z-10 flex px-5">
            <div
              onClick={() => setNav(!nav)}
              className="flex items-center gap-3 justify-center"
            >
              {nav ? (
                <FaTimes size={25} className="text-slate-700" />
              ) : (
                <FaBars size={25} className="text-slate-700" />
              )}{" "}
              <span> Filters</span>
            </div>
            <div
              className={`
        md:hidden bg-white z-10 fixed min-h-screen w-full md:w-fit sm:w-fit text-xl top-24 overflow-y-auto bottom-0 py-4  pl-4
        duration-500 ${nav ? "left-0" : "left-[-100%]"}
        `}
            >
              <Product_Filters
                categoryName={categoryName}
                footerRef={footerRef}
                setNav={setNav}
              />
            </div>
          </div>

          <div className="lg:pl-[279px] my-5 md:mt-0 mt-16">
            <div className="grid grid-cols-2 md:grid-cols-3 content-center justify-items-center lg:grid-cols-3 xl:grid-cols-4 gap-y-5">
              {(searchFilter == []
                ? rangeFilterProduct
                : searchRangeFilterProduct
              ).map((product) => (
                <Product_Card key={product._id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
      <div ref={footerRef}></div>
    </>
  );
};

export default Product;
