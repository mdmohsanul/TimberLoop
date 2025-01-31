import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addAddress,
  editAddress,
  fetchAddress,
} from "../../features/addressSlice";

const Address_Form = ({
  setAddressForm,
  setEditId,
  editId,
  existingAddress = null,
}) => {
  console.log(editId);
  console.log(existingAddress);

  const dispatch = useDispatch();
  const [inputAddress, setInputAddress] = useState({
    name: existingAddress?.name || "",
    locality: existingAddress?.locality || "",
    city: existingAddress?.city || "",
    mobileNum: existingAddress?.mobileNum || "",
    pincode: existingAddress?.pincode || "",
    fullAddress: existingAddress?.fullAddress || "",
    addressType: existingAddress?.addressType || "Home",
    state: existingAddress?.state || "",
  });
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInputAddress((prev) => ({ ...prev, [name]: value }));
    //    setAddressForm({...prev, [e.target.name]:e.target.value})
  };
  const saveHandler = () => {
    dispatch(addAddress(inputAddress));
  };
  const updateHandler = () => {
    console.log(inputAddress);
    dispatch(
      editAddress({
        id: existingAddress._id || existingAddress.id,
        ...inputAddress,
      })
    );
    // dispatch(fetchAddress());
  };

  return (
    <>
      <div className="py-2 md:px-6 md:w-4/5 ">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="md:grid md:grid-flow-col md:grid-rows-5 gap-4 mx-3 md:mx-0 flex flex-col ">
            <div className="md:col-span-2 col-span-1 border border-gray-300 outline-none ">
              <input
                type="text"
                name="name"
                onChange={changeHandler}
                value={inputAddress.name}
                className="w-full h-11 px-3 "
                placeholder="Name"
              />
            </div>
            <div className="md:col-span-2 border border-gray-300 outline-none">
              <input
                type="text"
                name="pincode"
                value={inputAddress.pincode}
                onChange={changeHandler}
                className="w-full h-11 px-3 "
                placeholder="Pincode"
              />
            </div>
            <div className="md:row-span-2 md:col-span-4 col-span-1 border h-full border-gray-300">
              <textarea
                name="fullAddress"
                onChange={changeHandler}
                value={inputAddress.fullAddress}
                cols="25"
                placeholder="Address (Area and Street)"
                className="w-full h-full p-3"
              ></textarea>
            </div>
            <div className="col-span-2 border border-gray-300 outline-none">
              <input
                type="text"
                name="city"
                value={inputAddress.city}
                onChange={changeHandler}
                className="w-full h-11 px-3 "
                placeholder="City"
              />
            </div>

            <div className="col-span-2 border border-gray-300 outline-none">
              <input
                type="text"
                name="mobileNum"
                value={inputAddress.mobileNum}
                onChange={changeHandler}
                className="w-full h-11 px-3 "
                placeholder="Mobile Number"
              />
            </div>
            <div className="col-span-2 border border-gray-300 outline-none">
              <input
                type="text"
                name="locality"
                value={inputAddress.locality}
                onChange={changeHandler}
                className="w-full h-11 px-3 "
                placeholder="Locality"
              />
            </div>
            <div className="col-span-2 border border-gray-300 outline-none">
              <input
                type="text"
                name="state"
                value={inputAddress.state}
                onChange={changeHandler}
                className="w-full h-11 px-3 "
                placeholder="State"
              />
            </div>
          </div>
          <div className="py-4 pl-1 text-sm mx-4 md:mx-0">
            <label htmlFor="addressType" className="text-gray-500">
              Address Type
            </label>
            <br />
            <input
              type="radio"
              name="addressType"
              value="Home"
              onChange={changeHandler}
              className="mr-3 mt-3"
            />
            <span className="pr-5">Home</span>
            <input
              type="radio"
              name="addressType"
              value="Work"
              onChange={changeHandler}
              className="mr-3 "
            />
            Work
          </div>
          <div className="my-4 mx-4 md:mx-0 md:flex ">
            <button
              className="py-4 px-20 bg-blue-500 text-white text-sm w-48 h-14 flex items-center justify-center mb-4 md:mb-0"
              onClick={existingAddress ? updateHandler : saveHandler}
            >
              {existingAddress ? "UPDATE" : "SAVE"}
            </button>
            <button
              className="py-4 px-20 bg-green-400 md:ml-4 text-white text-sm w-48 h-14 flex items-center justify-center"
              onClick={
                existingAddress
                  ? () => setEditId(null)
                  : () => setAddressForm(false)
              }
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Address_Form;
