import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchAddress,
  removeAddress,
  setDefaultAddress,
} from "../../features/addressSlice";
import Address_Form from "./Address_Form";

const Address_List = () => {
  const [addressForm, setAddressForm] = useState(false);
  const { status, error, addresses } = useSelector((state) => state.addresses);
  const dispatch = useDispatch();
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({});

  const handleEditClick = (addres) => {
    setEditId(addres._id);
    setFormData(addres);
  };

  useEffect(() => {
    dispatch(fetchAddress());
  }, []);

  return (
    <>
      <div className="border border-gray-200 mt-6 bg-slate-100">
        <p
          className="py-4 px-6 flex items-center text-blue-500 cursor-pointer"
          onClick={() => setAddressForm(!addressForm)}
        >
          {addressForm || <span className="text-2xl pr-3">+</span>} ADD A NEW
          ADDRESS
        </p>
        {addressForm && <Address_Form setAddressForm={setAddressForm} />}
      </div>
      {status === "loading" && <p>Loading.......</p>}
      {error && <p>{error}</p>}
      {status === "success" && (
        <ul className="border border-gray-200 mt-6">
          {addresses?.map((addres, i) => (
            <div key={addres._id}>
              {editId === addres._id ? (
                <Address_Form
                  setEditId={setEditId}
                  setAddressForm={setAddressForm}
                  editId={editId}
                  existingAddress={formData}
                />
              ) : (
                <li className="p-4 border-[0.2px] border-b-gray-200 md:flex items-center justify-between">
                  <div>
                    <input
                      type="radio"
                      name="defaultAddress"
                      onChange={() => dispatch(setDefaultAddress(addres))}
                    />

                    <p className="text-slate-700 bg-gray-100 px-2 mx-3 p-1 inline-block text-sm">
                      {addres?.addressType}
                    </p>
                    <p className="font-medium my-3">
                      {addres?.name}{" "}
                      <span className="pl-4">{addres?.mobileNum}</span>
                    </p>
                    <p>
                      {addres?.fullAddress}, {addres?.city}, {addres?.state}
                    </p>
                    <p className="font-medium">{addres?.pincode}</p>
                  </div>
                  <div className="flex flex-col gap-4 text-white mt-4 md:mt-0">
                    <button
                      className="bg-green-600 px-2 py-1"
                      onClick={() => handleEditClick(addres)}
                    >
                      Edit
                    </button>

                    <button
                      className="bg-red-600 px-2 py-1"
                      onClick={() => dispatch(removeAddress(addres?._id))}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              )}
            </div>
          ))}
        </ul>
      )}
    </>
  );
};

export default Address_List;
