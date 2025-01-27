import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const UserProfile_Page = () => {
  const { state, error, user } = useSelector((state) => state.userLogIn);
  const navigate = useNavigate();
  const btnClasses = "py-2 px-4 bg-slate-500 text-white rounded-md text-xl";

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("userId");

    navigate("/login");
  };
  return (
    <>
      <div className="w-full min-h-screen pt-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center flex-col">
            <p className="text-3xl font-medium">PROFILE DETAILS</p>
            <div className=" border-2  mt-5 px-5 py-4">
              <p className="text-xl">
                <span className="font-medium">Name: </span>{" "}
                {user?.user?.userName}
              </p>
              <p className="text-xl pb-6">
                <span className="font-medium">Email: </span> {user?.user?.email}
              </p>{" "}
              <button className={btnClasses}>Orders</button>
              <Link to="/userProfile/address">
                {" "}
                <button className={`${btnClasses} mx-3`}>Address</button>
              </Link>
              <button className={btnClasses} onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile_Page;
