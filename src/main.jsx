import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout.jsx";
import Header from "./components/Header.jsx";

const myRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={myRouter} />
  </React.StrictMode>
);
