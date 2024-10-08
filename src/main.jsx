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
import AllTransitions from "./Pages/AllTransitions";
import CashIn from "./Pages/CashIn";
import UserRoute from "./private/UserRoute";
import PendingTransitions from "./Pages/PendingTransitions";
import CashOut from "./Pages/CashOut";
import SendMoney from "./Pages/SendMoney";
import UserSelfTransaction from "./Pages/UserSelfTransection";
import TransactionManagement from "./Pages/TransactionManagement";
import AgentRoute from "./private/AgentRoute";
import AgentTransaction from "./Pages/AgentTransection";
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
  {
    path: "/allTransitions",
    element: (
      <AdminRoute>
        <AllTransitions />
      </AdminRoute>
    ),
  },
  {
    path: "/cashIn",
    element: (
      <UserRoute>
        <CashIn />
      </UserRoute>
    ),
  },
  {
    path: "/pendingTransitions",
    element: (
      <UserRoute>
        <PendingTransitions />
      </UserRoute>
    ),
  },
  {
    path: "/cashOut",
    element: (
      <UserRoute>
        <CashOut />
      </UserRoute>
    ),
  },
  {
    path: "/sendMoney",
    element: (
      <UserRoute>
        <SendMoney />
      </UserRoute>
    ),
  },
  {
    path: "/userSelfTransaction",
    element: (
      <UserRoute>
        <UserSelfTransaction />
      </UserRoute>
    ),
  },
  {
    path: "/agentTransaction",
    element: (
      <AgentRoute>
        <AgentTransaction />
      </AgentRoute>
    ),
  },
  {
    path: "/transactionManagement",
    element: (
      <AgentRoute>
        <TransactionManagement />
      </AgentRoute>
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
