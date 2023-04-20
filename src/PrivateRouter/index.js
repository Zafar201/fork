import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import AuthContext from "../Components/Store/Auth-context";

export default function PrivateRouter({ routeObject }) {
  const { allowed_user_types, element } = routeObject;
  const { isUserLoggedIn, isAdminLoggedIn } = useContext(AuthContext);

  if (allowed_user_types.includes("Admin")) {
    return isAdminLoggedIn ? element : <Navigate to="/admin-sign-in" />;
  } else {
    return isUserLoggedIn ? element : <Navigate to="/" />;
  }
}
