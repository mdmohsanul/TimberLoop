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
function App() {
  return (
    <>
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
        element: <UserProfile_Page />,
      },
      {
        path: "/userProfile/address",
        element: <Address_Page />,
      },
      {
        path: "/api/products",
        element: <Product />,
      },
      {
        path: "products/:productName",
        element: <Product />,
      },
      {
        path: "/wishlist",
        element: <Wishlist_Page />,
      },
      {
        path: "/cart",
        element: <Cart_Page />,
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
