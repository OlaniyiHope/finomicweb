// import { Navigate } from "react-router-dom";

// import AdminRoute from "./components/admindashboard/AdminRoute";
// import sessionRoutes from "./components/sessions/SessionRoutes";
// // import AdminDashboard from "./components/admindashboard/admin/AdminDashboard";

// const routes = [
//   {
//     path: "/admin-dashboard",
//     element: <AdminRoute />,
//   },
//   ...sessionRoutes,
//   { path: "/", element: <Navigate to="/login" /> },
// ];

// export default routes;

// src/routes.js
// import { Navigate } from "react-router-dom";
// import AdminRoute from "./components/admindashboard/AdminRoute";
// import sessionRoutes from "./components/sessions/SessionRoutes";
// import SalesRoute from "./components/salesdashboard/SalesRoute";
// import ManagerRoute from "./components/managerdashboard/ManagerRoute";
// import AuthGuard from "./auth/AuthGuard";

// const routes = [
//   ...sessionRoutes, // Unauthenticated routes
//   {
//     element: <AuthGuard />,
//     children: [...AdminRoute, ...SalesRoute, ...ManagerRoute],
//   },
//   // Ensure this comes last
//   { path: "/", element: <Navigate to="/dashboard/sales-dashboard" /> },
// ];

// export default routes;

import { Navigate } from "react-router-dom";
import AdminRoute from "./components/admindashboard/AdminRoute";
import sessionRoutes from "./components/sessions/SessionRoutes";
import SalesRoute from "./components/salesdashboard/SalesRoute";
import ManagerRoute from "./components/managerdashboard/ManagerRoute";
import AuthGuard from "./auth/AuthGuard";
import Home from "./pages/Home";
import GoogleAuthHandler from "./GoogleAuthHandler";

const routes = [
  { path: "/oauth-callback", element: <GoogleAuthHandler /> },

  {
    children: [...AdminRoute, ...SalesRoute, ...ManagerRoute],
  },
  ...sessionRoutes,

  // { path: "/", element: <Navigate to="vision" /> },
  {
    path: "*", // Catch-all route to handle unmatched paths
    element: <Navigate to="/login" replace />,
  },
];

export default routes;
