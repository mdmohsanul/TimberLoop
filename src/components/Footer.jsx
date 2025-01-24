import React from "react";
import Timber_Logo from "/Timber_logo.webp";
import { paymentsIcon, socialIcons, footerLinks } from "../data/footerData";
import SubFooter from "./SubFooter";

const Footer = () => {
  return (
    <>
      <div className="w-full mx-auto bg-slate-200 pt-7 z-10 pb-2 relative">
        <div className="max-w-[1200px] mx-auto">
          <img
            loading="lazy"
            src={Timber_Logo}
            alt="Timber_Logo"
            className="h-11 w-36 md:h-11 md:w-36 pl-4 md:pl-0  mix-blend-multiply"
          />
          <div className="max-w-[1100px] mx-auto py-5 px-6 md:px-0 font-semibold text-lg  flex md:flex-row flex-col gap-5 items-center justify-between border-b border-slate-400">
            <SubFooter header="We Accept" iconList={paymentsIcon} />
            <SubFooter
              header="Like What You See? Follow us Here"
              iconList={socialIcons}
            />
          </div>

          <div className="text-center text-slate-500 ">
            <ul className="flex flex-col md:flex-row items-center justify-center gap-7 py-4">
              {footerLinks.map((item) => (
                <li key={item.id}>{item.linkName}</li>
              ))}
            </ul>
            <p>© Copyright Timber Limited</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
