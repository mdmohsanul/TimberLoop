import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchCart } from "../features/cartSlice";
import { fetchOrder } from "../features/orderSlice";
import { fetchWishlist } from "../features/wishlistSlice";
import useCurrentUser from "../hooks/useCurrentUser";

const UserProfile_Page = () => {
  const dispatch = useDispatch();
  const { user, status, error } = useCurrentUser();
  const userId = user?._id;

  const navigate = useNavigate();
  const btnClasses =
    "py-2 px-4 bg-blue-500 text-white rounded-md text-lg md:text-xl w-full";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
    navigate("/login", { replace: true });
  };
  useEffect(() => {
    if (userId) {
      dispatch(fetchCart(userId));
      dispatch(fetchWishlist(userId));
      dispatch(fetchOrder(userId));
    }
  }, [dispatch, userId]);
  if (status === "loading")
    return (
      <>
        <h1>Loading.....</h1>
      </>
    );
  if (status === "failed")
    return (
      <>
        <h1>{error}</h1>
      </>
    );

  return (
    <>
      <section className="w-full min-h-screen pt-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center flex-col mx-5 md:mx-0">
            <p className="md:text-3xl text-2xl font-medium text-gray-700">
              PROFILE DETAILS
            </p>
            <div className=" border-2  md:mt-5 mt-2 px-5 py-4">
              <p className="text-lg md:text-xl text-gray-600">
                <span className="font-medium text-gray-700">Name: </span>{" "}
                {user?.userName}
              </p>
              <p className="text-lg md:text-xl text-gray-600 pb-6">
                <span className="font-medium text-gray-700">Email: </span>{" "}
                {user?.email}
              </p>{" "}
              <Link to="/orders">
                {" "}
                <button className={btnClasses}>Orders</button>
              </Link>
              <Link to="/userProfile/address">
                {" "}
                <button className={`${btnClasses}  my-4 `}>Address</button>
              </Link>
              <button className={btnClasses} onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserProfile_Page;
