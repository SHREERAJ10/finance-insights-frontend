import { onAuthStateChanged } from "firebase/auth";
import Login from "./pages/Auth/Login.jsx";
import SignUp from "./pages/Auth/SignUp.jsx";
import { auth } from "../config/firebase.js";
import { useContext, useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { AuthContext, AuthContextProvider } from "./context/AuthContext.jsx";
import DataPage from "./pages/DataPage.jsx";
import Settings from "./pages/Settings.jsx";
import { IsInsightShownContextProvider } from "./context/IsInsightShowContext.jsx";
import LoadingDots from "./components/LoadingDots.jsx";
import { Bounce, ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    Component: ProtectedRoute,
    children: [
      { index: true, Component: Dashboard },
      { path: "/data", Component: DataPage },
      { path: "/settings", Component: Settings },
    ],
  },
  { path: "/signup", Component: SignUp },
  { path: "/login", Component: Login },
]);

function App() {
  const { setUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currUser) => {
      if (currUser) {
        setUser(currUser);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="font-urbanist">
      {isLoading ? (
        <LoadingDots />
      ) : (
        <IsInsightShownContextProvider>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
          <RouterProvider router={router} />
        </IsInsightShownContextProvider>
      )}
    </div>
  );
}

export default App;
