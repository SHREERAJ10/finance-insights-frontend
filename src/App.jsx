import { onAuthStateChanged } from "firebase/auth";
import Auth from "./components/Auth.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import { auth } from "../config/firebase.js";
import { useContext, useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import  { AuthContext, AuthContextProvider } from "./context/AuthContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: ProtectedRoute,
    children: [
      { index: true, Component: Dashboard },
    ],
  },
  { path: "/signup", Component: SignUp },
  { path: "/login", Component: Login },
]);

function App() {
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currUser) => {
      if (currUser) {
        setUser(currUser);
      } else {
        console.log("user is signedOut");
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="font-urbanist">     
        <RouterProvider router={router} />
    </div>
  );
}

export default App;
