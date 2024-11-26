import React from "react";
import Image_1 from "/Sustainability.webp";
import Image_2 from "/Sustainability-min.webp";

const Home_Top_Banner = () => {
  return (
    <>
      <div className="pt-20">
        {/* Image for mobile */}
        <img
          src={Image_2}
          alt="Mobile"
          className="block sm:hidden h-40 w-[700px] md:py-4"
        />
        {/* Image for desktop */}
        <img
          src={Image_1}
          alt="Desktop"
          className="hidden sm:block h-[320px] w-full md:py-4"
        />{" "}
      </div>
    </>
  );
};

export default Home_Top_Banner;
