import React from "react";
import { useLocation } from "react-router-dom";
import ShimerUI_ProductsPage from "../components/ShimmerUI/ShimerUI_ProductsPage";

const Test = () => {
  const location = useLocation();
  const data = location.state;
  console.log(data);
  return (
    <>
      <div></div>
    </>
  );
};

export default Test;
