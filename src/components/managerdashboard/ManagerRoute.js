import React from "react";
import { Route } from "react-router-dom";
import AdminDashboard from "./admin/ManagerDashboard";
import ViewAdmin from "./admin/ViewAdmin";
import AllSale from "./forms/AllSale";
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
import SalesDashboard from "../salesdashboard/sales/SalesDashboard";
import ViewManager from "./admin/ViewManager";
import ViewSalesUsers from "./admin/ViewSalesUsers";
import AddSalesPage from "./forms/AddSalesPage";
import ViewPoints from "./forms/ViewPoints";
import ViewDisSales from "./forms/ViewDisSales";
import ViewDisManager from "./forms/ViewDisManager";
import ManagerDashboard from "./admin/ManagerDashboard";

const ManagerRoute = [
  {
    path: "/dashboard/manager-dashboard",
    element: <ManagerDashboard />,
    auth: "admin",
  },
  { path: "/view-admin", element: <ViewAdmin />, auth: "admin" },
  { path: "/view-manager", element: <ViewManager />, auth: "admin" },
  {
    path: "/manager/view-sales-disbursement",
    element: <ViewDisSales />,
    auth: "manager",
  },
  {
    path: "/manager/view-manager-disbursement",
    element: <ViewDisManager />,
    auth: "manager",
  },
  { path: "/manager/view-manager", element: <ViewManager />, auth: "admin" },
  {
    path: "/manager/view-sales-operators",
    element: <ViewSalesUsers />,
    auth: "manager",
  },
  {
    path: "/manager/sales-dashboard",
    element: <SalesDashboard />,
    auth: "manager",
  },
  { path: "/manager/sales-list", element: <AllSale />, auth: "manager" },
  { path: "/manager/invoice-report", element: <Invoice />, auth: "manager" },
  { path: "/manager/quotation-list", element: <Quotation />, auth: "manager" },
  { path: "/manager/purchase-list", element: <AllPurchase />, auth: "manager" },
  { path: "/manager/expense-list", element: <AllExpense />, auth: "manager" },
  { path: "/manager/add-sales", element: <AddSale />, auth: "manager" },
  { path: "/manager/view-points", element: <ViewPoints />, auth: "manager" },
  {
    path: "/manager/add-sales-page",
    element: <AddSalesPage />,
    auth: "manager",
  },
  { path: "/manager/profile", element: <Profile />, auth: "manager" },
  { path: "/manager/settings", element: <Setting />, auth: "manager" },
  { path: "/manager/all-users", element: <AllUsers />, auth: "manager" },
  { path: "/manager/permission", element: <Permission />, auth: "manager" },
];

export default ManagerRoute;
