// import useAuth from "../components/hooks/useAuth";
// // import { flat } from 'app/utils/utils';
// import { Navigate, useLocation } from "react-router-dom";
// // import AllPages from '../routes';

// // const userHasPermission = (pathname, user, routes) => {
// //   if (!user) {
// //     return false;
// //   }
// //   const matched = routes.find((r) => r.path === pathname);

// //   const authenticated =
// //     matched && matched.auth && matched.auth.length ? matched.auth.includes(user.role) : true;
// //   return authenticated;
// // };

// const AuthGuard = ({ children }) => {
//   let {
//     isAuthenticated,
//     // user
//   } = useAuth();
//   const { pathname } = useLocation();

//   //   const routes = flat(AllPages);

//   //   const hasPermission = userHasPermission(pathname, user, routes);
//   //   let authenticated = isAuthenticated && hasPermission;

//   // // IF YOU NEED ROLE BASED AUTHENTICATION,
//   // // UNCOMMENT ABOVE LINES
//   // // AND COMMENT OUT BELOW authenticated VARIABLE

//   let authenticated = isAuthenticated;

//   return (
//     <>
//       {authenticated ? (
//         children
//       ) : (
//         <Navigate replace to="/login" state={{ from: pathname }} />
//       )}
//     </>
//   );
// };

// export default AuthGuard;
// import useAuth from "../components/hooks/useAuth";
// // import { flat } from 'app/utils/utils';
// import { Navigate, useLocation } from "react-router-dom";

// const AuthGuard = ({ children }) => {
//   const { isAuthenticated, isInitialised } = useAuth();
//   const { pathname } = useLocation();

//   if (!isInitialised) {
//     return <div>Loading...</div>;
//   }

//   return isAuthenticated ? (
//     <>
//       {/* Add this debug text */}
//       {children}
//     </>
//   ) : (
//     <Navigate replace to="/login" state={{ from: pathname }} />
//   );
// };

// export default AuthGuard;
// export default AuthGuard;

// import useAuth from "../components/hooks/useAuth";
// // import { flat } from 'app/utils/utils';
// import { Navigate, useLocation } from "react-router-dom";
// const AuthGuard = ({ children }) => {
//   const { isAuthenticated, isInitialised } = useAuth();
//   const { pathname } = useLocation();

//   if (!isInitialised) {
//     return <div>Loading...</div>;
//   }

//   return isAuthenticated ? (
//     <>
//       {/* Protected route */}
//       {children}
//     </>
//   ) : (
//     <Navigate replace to="/login" state={{ from: pathname }} />
//   );
// };
// export default AuthGuard;

import useAuth from "../components/hooks/useAuth";
// import { flat } from 'app/utils/utils';
import { Navigate, useLocation } from "react-router-dom";
const AuthGuard = ({ children }) => {
  const { isAuthenticated, isInitialised } = useAuth();
  const { pathname } = useLocation();

  const storedAccessToken = localStorage.getItem("jwtToken");

  if (!isInitialised) {
    return <div>Loading...</div>;
  }

  // Check if either isAuthenticated or storedAccessToken exists
  const isUserAuthenticated = isAuthenticated || storedAccessToken;

  return isUserAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate replace to="/login" state={{ from: pathname }} />
  );
};

export default AuthGuard;
