import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import WelcomePage from "./Pages/WelcomePage";
import Home from "./Pages/Home";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./Context/UserContext";
import AllUserList from "./Pages/AllUserList";
import AdminRoute from "./private/AdminRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { UserDataProvider } from "./Context/LoadDataContext";
const queryClient = new QueryClient();
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
    element: (
      <AdminRoute>
        <AllUserList />
      </AdminRoute>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <RouterProvider router={router} />
        <Toaster position="top-center" reverseOrder={false} />
      </UserProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
