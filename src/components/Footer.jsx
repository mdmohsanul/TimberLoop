import React from "react";
import Timber_Logo from "/Timber_logo.webp";
import { paymentsIcon } from "../data/footerData";
import { socialIcons } from "../data/footerData";

const Footer = () => {
  return (
    <>
      <div className="w-full bg-slate-200 py-7">
        <div className="max-w-[1200px] mx-auto">
          <img
            loading="lazy"
            src={Timber_Logo}
            alt="Timber_Logo"
            className="h-11 w-36 md:h-11 md:w-36 pl-4 md:pl-0  mix-blend-multiply"
          />
          <div className="max-w-[1100px] mx-auto py-5 font-semibold text-lg  flex md:flex-row flex-col gap-5 items-center justify-between border-b border-slate-400">
            <div>
              <h2>We Accept</h2>
              <div className="flex items-center justify-between gap-4">
                {paymentsIcon.map((item) => (
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
            <div>
              <h2 className="md:pl-3">Like What You See? Follow us Here</h2>
              <div className="flex items-center justify-between gap-2 pt-3">
                {socialIcons.map((item) => (
                  <img
                    loading="lazy"
                    key={item.id}
                    src={item.icon}
                    alt="socialIcon"
                    className=" aspect-[3/2] object-contain"
                  ></img>
                ))}
              </div>
            </div>
          </div>
          <div className="py-5">
            <div className="text-center text-slate-500">
              <ul className="flex flex-col md:flex-row items-center justify-center gap-7 py-4">
                <li>Whitehat</li>

                <li>Sitemap</li>
                <li>Terms Of Use</li>
                <li>Privacy Policy</li>
                <li>Your Data and Security</li>
                <li>Grievance Redressal</li>
              </ul>
              <p>© Copyright Timber Limited</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
