import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout.jsx";
import App from "./App.jsx";
import Products from "./pages/Products.jsx";
import Categories from "./pages/Categories.jsx";
import Variations from "./pages/Variations.jsx";
import Collections from "./pages/Collections.jsx";

const myRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Products />,
        children: [
          {
            path: "/categories",
            element: <Categories />,
          },
          {
            path: "/variations",
            element: <Variations />,
          },
          {
            path: "/products",
            element: <Products />,
          },
          {
            path: "/collections",
            element: <Collections />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={myRouter} />
  </React.StrictMode>
);
