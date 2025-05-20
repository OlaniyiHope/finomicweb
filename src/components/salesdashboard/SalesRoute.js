// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import About from "./pages/About";
// // import Home from "./pages/Home";
// // import Login from "./pages/Login";
// import AdminDashboard from "./admin/AdminDashboard";
// const AdminRoute = [
//   <Route exact path="admin-dashboard" element={<AdminDashboard />

//   } />,
// ];

// export default AdminRoute;
// src/AdminRoute.js
import React from "react";
import { Route } from "react-router-dom";

import Invoice from "./forms/Invoice";
import Quotation from "./forms/Quotation";
import AllPurchase from "./forms/AllPurchase";
import AllExpense from "./forms/AllExpense";
import AddSale from "./forms/AddSale";
import Profile from "./forms/Profile";
import Setting from "./forms/Setting";
import AllUsers from "./forms/AllUsers";
import Role from "./forms/Role";
import Permission from "./forms/Permission";
import SalesDashboard from "./sales/SalesDashboard";

import AddSalesPage from "./forms/AddSalesPage";

import AllSale from "./forms/AllSale";
import ViewSalesDis from "./forms/ViewSalesDis";

const SalesRoute = [
  {
    path: "/dashboard/sales-dashboard",
    element: <SalesDashboard />,
    auth: "admin",
  },

  {
    path: "/sales/view-sales-disbursement",
    element: <ViewSalesDis />,
    auth: "admin",
  },

  { path: "/sales/sales-list", element: <AllSale />, auth: "admin" },
  { path: "/sales/invoice-report", element: <Invoice />, auth: "admin" },
  { path: "/sales/quotation-list", element: <Quotation />, auth: "admin" },
  { path: "/sales/purchase-list", element: <AllPurchase />, auth: "admin" },
  { path: "/sales/expense-list", element: <AllExpense />, auth: "admin" },
  { path: "/sales/add-sales", element: <AddSale />, auth: "admin" },
  { path: "/sales/add-sales-page", element: <AddSalesPage />, auth: "admin" },
  { path: "/sales/profile", element: <Profile />, auth: "admin" },
  { path: "/sales/settings", element: <Setting />, auth: "admin" },
  { path: "/sales/all-users", element: <AllUsers />, auth: "admin" },
  { path: "/sales/role-permission", element: <Role />, auth: "admin" },
  { path: "/sales/permission", element: <Permission />, auth: "admin" },
];

export default SalesRoute;
