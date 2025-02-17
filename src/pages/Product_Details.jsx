import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { GoHeart } from "react-icons/go";
import { PiStarFill, PiStarHalfFill } from "react-icons/pi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { productDetailsAccordian } from "../data/product";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useCartHandler from "../hooks/useCartHandler";
import useWishlistHandler from "../hooks/useWishlistHandler";

const Product_Details = () => {
  const { productId } = useParams();

  const navigate = useNavigate();

  const { products, status, error } = useSelector((state) => state.products);
  const [checkWishlistProduct, setCheckWishlistProduct] = useState("");

  // finding product with the paramater
  const findProduct = products.find((product) => product._id === productId);

  const [quantity, setQuantity] = useState(1);

  // for accordian
  const [activeId, setActiveId] = useState(false);

  const [checkProduct, setCheckProduct] = useState("");

  // dispatch the product to cart
  const handleCart = useCartHandler();

  // dispatch product to wishlist
  const handleWishlist = useWishlistHandler();

  // calculating the final price by discount percentage
  const priceAfterDiscount = (
    findProduct?.price -
    (findProduct?.price * findProduct?.discount) / 100
  ).toFixed(2);

  // accordian handler
  const handleButton = (id) => {
    setActiveId((prevId) => (prevId === id ? false : id));
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <section className="bg-gray-100 pt-20 pb-5">
        <ToastContainer />
        <div className="container mx-auto px-4 py-0 md:py-8 relative">
          <div className="flex flex-wrap -mx-4">
            {/* Product Images */}
            <div className="w-full md:w-1/2 px-4 ">
              <img
                src={`https://i.pinimg.com/${findProduct?.image}`}
                alt="Product"
                className="w-full h-96 rounded-lg shadow-md mb-4"
                id="mainImage"
              />
            </div>

            {/* Product Details */}
            <div className="w-full md:w-1/2 px-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                {findProduct?.name}
              </h2>
              <p className="text-gray-600 mb-4">SKU: WH1000XM4</p>
              <div className="mb-4">
                <span className="text-xl md:text-2xl font-bold mr-2">
                  ₹ {priceAfterDiscount}
                </span>
                <span className="text-gray-500 line-through mr-3">
                  ₹{findProduct?.price}
                </span>
                <span className="text-red-500">
                  {findProduct?.discount}% Off
                </span>
              </div>
              <div className="flex items-center mb-4">
                <span className="text-yellow-400 flex text-xl">
                  <PiStarFill />
                  <PiStarFill />
                  <PiStarFill />
                  <PiStarFill />
                  <PiStarHalfFill />
                </span>

                <span className="ml-2 text-gray-600">
                  {findProduct?.rating} (120 reviews)
                </span>
              </div>
              <p className="text-gray-700 mb-6">
                Enhance your living space with premium-quality furniture
                designed for comfort and style. Perfect for modern homes,
                offices, and cozy retreats.
              </p>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Color:</h3>
                <div className="flex space-x-2">
                  <button className="w-8 h-8 bg-black rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"></button>
                  <button className="w-8 h-8 bg-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"></button>
                  <button className="w-8 h-8 bg-blue-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"></button>
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Quantity:
                </label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  min="1"
                  max="5"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-12 text-center rounded-md border-gray-300  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>

              <div className="flex w-full md:space-x-4 md:mb-6 fixed bottom-0 right-0 z-30 md:static">
                <button
                  type="button"
                  className="bg-indigo-600 flex w-2/4 md:w-auto gap-2 items-center text-white px-6 py-3 md:rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={() => {
                    checkProduct === findProduct._id
                      ? navigate("/cart")
                      : handleCart(findProduct._id, setCheckProduct, quantity);
                  }}
                >
                  <HiOutlineShoppingCart size={23} />
                  {checkProduct === findProduct._id
                    ? "Go To Cart"
                    : "Add to Cart"}
                </button>
                <button
                  className="bg-gray-200 flex gap-2 w-2/4 md:w-auto items-center  text-gray-800 px-6 py-3 md:rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  onClick={() =>
                    handleWishlist(findProduct._id, setCheckWishlistProduct)
                  }
                >
                  <GoHeart size={23} />
                  Wishlist
                </button>
              </div>

              <div className="md:w-11/12">
                {productDetailsAccordian.map((item) => (
                  <div className="border-b-[1px] border-gray-300" key={item.id}>
                    <div
                      className="flex items-center justify-between py-4"
                      onClick={() => handleButton(item.id)}
                    >
                      <h2 className="text-lg">{item.accordianHeader}</h2>
                      <span className="text-xl text-slate-600">
                        {activeId === item.id ? (
                          <IoIosArrowUp />
                        ) : (
                          <IoIosArrowDown />
                        )}
                      </span>
                    </div>
                    {activeId === item.id && (
                      <p className="pb-3 text-gray-500">
                        {item.accordianContent}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Product_Details;
