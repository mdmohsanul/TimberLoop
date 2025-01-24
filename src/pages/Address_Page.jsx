import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Address_Form from "../components/Address_Form";
import { fetchAddress, removeAddress } from "../features/addressSlice";

const Address_Page = () => {
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
  }, [dispatch]);

  return (
    <>
      <div className="w-full min-h-screen bg-slate-100 pt-20 pb-7">
        <div className="max-w-4xl mx-auto  px-9 py-5 bg-white">
          <h2 className="text-xl">Manage Addresses</h2>
          <div className="border border-gray-200 mt-6 bg-slate-100">
            <p
              className="py-4 px-6 flex items-center text-blue-500 cursor-pointer"
              onClick={() => setAddressForm(!addressForm)}
            >
              {addressForm || <span className="text-2xl pr-3">+</span>} ADD A
              NEW ADDRESS
            </p>
            {addressForm && <Address_Form setAddressForm={setAddressForm} />}
          </div>
          {status === "loading" && <p>Loading.......</p>}
          {error && <p>{error}</p>}
          {status === "success" && (
            <ul className="border border-gray-200 mt-6">
              {addresses?.map((addres) => (
                <div key={addres._id}>
                  {editId === addres._id ? (
                    <Address_Form
                      setAddressForm={setAddressForm}
                      existingAddress={formData}
                    />
                  ) : (
                    <li className="p-4 border-[0.2px] border-b-gray-200 flex items-center justify-between">
                      <div>
                        <p className="text-slate-700 bg-gray-100 px-2  p-1 inline-block text-sm">
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
                      <div className="flex flex-col gap-4">
                        <button
                          className="bg-green-400 px-2 py-1"
                          onClick={() => handleEditClick(addres)}
                        >
                          Edit
                        </button>

                        <button
                          className="bg-red-400 px-2 py-1"
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
        </div>
      </div>
    </>
  );
};

export default Address_Page;
