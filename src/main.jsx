import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import WelcomePage from "./Pages/WelcomePage";
import Home from "./Pages/Home";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./Context/UserContext";
import AllUserList from "./Pages/AllUserList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/allusers",
    element: <AllUserList />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
      <Toaster position="top-center" reverseOrder={false} />
    </UserProvider>
  </React.StrictMode>
);
