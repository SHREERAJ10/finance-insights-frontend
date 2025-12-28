import React, { useContext } from "react";
import AuthContext from "../context/AuthContext.jsx";
import { Outlet } from "react-router-dom";
import Login from "../pages/Auth/Login.jsx";

function ProtectedRoute() {

    const {user} = useContext(AuthContext);

  return (
    <>
      <div>
        {user?<Outlet />:<Login />}
      </div>
    </>
  );
}

export default ProtectedRoute;
