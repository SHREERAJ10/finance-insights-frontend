import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../../config/firebase.js";

const logout = () => {
  signOut(auth).catch((err) => {
    console.log(err);
  });
};

function Dashboard() {
  return (
    <>
      <div className="p-6">
        <h1>Dashboard</h1>
        <button
          className="text-2xl cursor-pointer hover:underline"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </>
  );
}

export default Dashboard;
