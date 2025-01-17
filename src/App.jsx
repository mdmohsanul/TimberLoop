import Header from "./components/Header";

import "./App.css";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { createBrowserRouter, Router, Outlet } from "react-router-dom";
import Product from "./pages/Product";
import Test from "./pages/Test";
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
        path: "/products",
        element: <Product />,
      },
      {
        path: "products/:productName",
        element: <Product />,
      },
      {
        path: "test",
        element: <Test />,
      },
    ],
  },
]);
export default appRouter;
