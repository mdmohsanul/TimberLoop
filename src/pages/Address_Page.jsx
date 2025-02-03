import React, { useState, useEffect } from "react";
import Address_List from "../components/Address/Address_List";

const Address_Page = () => {
  return (
    <>
      <section className="w-full min-h-screen bg-slate-100 md:pt-20 pt-16 pb-7">
        <div className="max-w-4xl mx-auto  md:px-9 px-3 py-5 bg-white">
          <h2 className="text-xl">Manage Addresses</h2>
          <Address_List />
        </div>
      </section>
    </>
  );
};

export default Address_Page;
