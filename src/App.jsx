import Header from "./components/Header";

import "./App.css";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { createBrowserRouter, Router, Outlet } from "react-router-dom";
import Product from "./pages/Product";
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
        path: "/:productName",
        element: <Product />,
      },
    ],
  },
]);
export default appRouter;
