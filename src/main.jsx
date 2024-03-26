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
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";

const myRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Categories />,
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
          {
            path: "/product/:id",
            element: <ProductDetailPage />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={myRouter} />
    </Provider>
  </React.StrictMode>
);
