import React from "react";
import { Route } from "react-router-dom";
import AdminDashboard from "./admin/AdminDashboard";

import Setting from "./forms/Setting";

import AuthGuard from "../../auth/AuthGuard";
import Library from "./forms/Library";
import ApiDocs from "./forms/ApiDocs";
import Today from "./forms/Today";
import Yesterday from "./forms/Yesterday";
import Inquiries from "./forms/Inquiries";
import Budgeting from "./forms/Budgeting";
import InsvtRec from "./forms/InsvtRec";
import Money from "./forms/Money";
import BudInsight from "./forms/BudInsight";
import Goal from "./forms/Goal";
import FinAd from "./forms/FinAd";
import Portfolio from "./forms/Portfolio";
import Market from "./forms/Market";
import DeFi from "./forms/DeFi";
import Credit from "./forms/Credit";
import Stock from "./forms/Stock";
import Bond from "./forms/Bond";
import Crypto from "./forms/Crypto";
import Forex from "./forms/Forex";
import Real from "./forms/Real";
import Block from "./forms/Block";
import MarkIn from "./forms/MarkIn";
import Finance from "./forms/Finance";
import Tax from "./forms/Tax";
import Mobile from "./forms/Mobile";
import Digital from "./forms/Digital";
import Connectivity from "./forms/Connectivity";
import Expense from "./forms/Expense";
import Loan from "./forms/Loan";
import Coach from "./forms/Coach";
import "./point.css";

const AdminRoute = [
  {
    path: "/home",
    element: (
      <>
        {/* This will extract and store tokens */}
        <AuthGuard>
          <AdminDashboard />
        </AuthGuard>
      </>
    ),
  },

  {
    path: "/settings",
    element: (
      <AuthGuard>
        <Setting />
      </AuthGuard>
    ),
  },
  {
    path: "/library",
    element: (
      <AuthGuard>
        <Library />
      </AuthGuard>
    ),
  },
  {
    path: "/api-docs",
    element: (
      <AuthGuard>
        <ApiDocs />
      </AuthGuard>
    ),
  },
  {
    path: "/today",
    element: (
      <AuthGuard>
        <Today />
      </AuthGuard>
    ),
  },
  {
    path: "/yesterday",
    element: (
      <AuthGuard>
        <Yesterday />
      </AuthGuard>
    ),
  },
  {
    path: "/inquiries",
    element: (
      <AuthGuard>
        <Inquiries />
      </AuthGuard>
    ),
  },
  {
    path: "/budgeting",
    element: (
      <AuthGuard>
        <Budgeting />
      </AuthGuard>
    ),
  },
  {
    path: "/investment-recommendation",
    element: (
      <AuthGuard>
        <InsvtRec />
      </AuthGuard>
    ),
  },
  {
    path: "/money-management",
    element: (
      <AuthGuard>
        <Money />
      </AuthGuard>
    ),
  },
  {
    path: "/budgeting-insight",
    element: (
      <AuthGuard>
        <BudInsight />
      </AuthGuard>
    ),
  },
  {
    path: "/goal-tracking",
    element: (
      <AuthGuard>
        <Goal />
      </AuthGuard>
    ),
  },
  {
    path: "/financial-advice",
    element: (
      <AuthGuard>
        <FinAd />
      </AuthGuard>
    ),
  },
  {
    path: "/investment-portfolio-recommendation",
    element: (
      <AuthGuard>
        <Portfolio />
      </AuthGuard>
    ),
  },
  {
    path: "/market-analysis",
    element: (
      <AuthGuard>
        <Market />
      </AuthGuard>
    ),
  },
  {
    path: "/decentralized-finance",
    element: (
      <AuthGuard>
        <DeFi />
      </AuthGuard>
    ),
  },
  {
    path: "/ai-powered-credit-solution",
    element: (
      <AuthGuard>
        <Credit />
      </AuthGuard>
    ),
  },
  {
    path: "/stock",
    element: (
      <AuthGuard>
        <Stock />
      </AuthGuard>
    ),
  },
  {
    path: "/bond",
    element: (
      <AuthGuard>
        <Bond />
      </AuthGuard>
    ),
  },
  {
    path: "/crypto",
    element: (
      <AuthGuard>
        <Crypto />
      </AuthGuard>
    ),
  },
  {
    path: "/forex",
    element: (
      <AuthGuard>
        <Forex />
      </AuthGuard>
    ),
  },
  {
    path: "/real-estate",
    element: (
      <AuthGuard>
        <Real />
      </AuthGuard>
    ),
  },
  {
    path: "/block-chain",
    element: (
      <AuthGuard>
        <Block />
      </AuthGuard>
    ),
  },
  {
    path: "/market-insight",
    element: (
      <AuthGuard>
        <MarkIn />
      </AuthGuard>
    ),
  },
  {
    path: "/finance-literacy",
    element: (
      <AuthGuard>
        <Finance />
      </AuthGuard>
    ),
  },
  {
    path: "/ai-based-tax",
    element: (
      <AuthGuard>
        <Tax />
      </AuthGuard>
    ),
  },
  {
    path: "/mobile-money",
    element: (
      <AuthGuard>
        <Mobile />
      </AuthGuard>
    ),
  },
  {
    path: "/digital-finance-integration",
    element: (
      <AuthGuard>
        <Digital />
      </AuthGuard>
    ),
  },
  {
    path: "/connectivity",
    element: (
      <AuthGuard>
        <Connectivity />
      </AuthGuard>
    ),
  },
  {
    path: "/expense-tracker",
    element: (
      <AuthGuard>
        <Expense />
      </AuthGuard>
    ),
  },
  {
    path: "/loan-recommendation",
    element: (
      <AuthGuard>
        <Loan />
      </AuthGuard>
    ),
  },
  {
    path: "/financial-coaching",
    element: (
      <AuthGuard>
        <Coach />
      </AuthGuard>
    ),
  },
];

export default AdminRoute;
