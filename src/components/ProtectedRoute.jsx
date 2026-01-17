import React, { useContext } from "react";
import AuthContext from "../context/AuthContext.jsx";
import Login from "../pages/Auth/Login.jsx";
import Layout from "./Layout.jsx";
import { InsightContextProvider } from "@/context/InsightContext.jsx";

function ProtectedRoute() {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user ? (
        <InsightContextProvider>
          <Layout />
        </InsightContextProvider>
      ) : (
        <Login />
      )}
    </>
  );
}

export default ProtectedRoute;
