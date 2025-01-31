import { useEffect } from "react";
import Header from "./components/Header";
import "./App.css";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { createBrowserRouter, Router, Outlet } from "react-router-dom";
import Product from "./pages/Product";
import Test from "./pages/Test";
import LogIn from "./pages/LogIn";
import SignUp_Page from "./pages/SignUp_Page";
import UserProfile_Page from "./pages/UserProfile_Page";
import Address_Page from "./pages/Address_Page";
import Wishlist_Page from "./pages/Wishilist_Page";
import Cart_Page from "./pages/Cart_Page";
import Orders_Page from "./pages/Orders_Page";
import Product_Details from "./pages/Product_Details";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./features/productSlice";
import ShimerUI_ProductsPage from "./components/ShimmerUI/ShimerUI_ProductsPage";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);
  return (
    <>
      {status === "loading" && <ShimerUI_ProductsPage />}
      {error && <p>{error}</p>}
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/signup",
        element: <SignUp_Page />,
      },
      {
        path: "/userProfile",
        element: (
          <ProtectedRoute>
            <UserProfile_Page />
          </ProtectedRoute>
        ),
      },
      {
        path: "/userProfile/address",
        element: <Address_Page />,
      },
      {
        path: "/products",
        element: <Product />,
      },
      {
        path: "category/:categoryName",
        element: <Product />,
      },
      {
        path: "/products/:productId",
        element: <Product_Details />,
      },
      {
        path: "/wishlist",
        element: (
          <ProtectedRoute>
            {" "}
            <Wishlist_Page />
          </ProtectedRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Cart_Page />
          </ProtectedRoute>
        ),
      },
      {
        path: "/order",
        element: <Orders_Page />,
      },
      {
        path: "test",
        element: <Test />,
      },
    ],
  },
]);
export default appRouter;
