import React from "react";

const SubFooter = ({ header, iconList }) => {
  return (
    <>
      <div>
        <h2>{header}</h2>
        <div
          className={`flex items-center justify-between  ${
            header === "We Accept" ? "gap-4" : "gap-4 pt-2"
          }`}
        >
          {iconList.map((item) => (
            <img
              loading="lazy"
              key={item.id}
              src={item.icon}
              alt="paymentIcon"
              className={item.style}
            ></img>
          ))}
        </div>
      </div>
    </>
  );
};

export default SubFooter;
