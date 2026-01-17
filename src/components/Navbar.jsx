import React, { useContext } from "react";
import { SidebarTrigger } from "./ui/sidebar.jsx";
import AuthContext from "@/context/AuthContext.jsx";
import { IsInsightShownContext } from "@/context/IsInsightShowContext.jsx";

function Navbar({ getInsight }) {
  const { user } = useContext(AuthContext);
  const { setIsInsightShown } = useContext(IsInsightShownContext);
  const username = user.displayName || "Person";

  return (
    <>
      <nav className="w-full h-full px-5 py-2.5 border-b border-[#cecece] flex justify-between items-center">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <h1 className="text-3xl font-semibold text-[#3A3A3A]">
            Hi, {username}
          </h1>
        </div>
        <button
          className="px-4 py-2.5 bg-[#272727] text-[#FBFBFB] text-lg tracking-wider rounded-xl cursor-pointer hover:brightness-110 transition-all duration-150 ease-in-out"
          onClick={() => {
            setIsInsightShown(true);
            getInsight();
          }}
        >
          Generate Insights
        </button>
      </nav>
    </>
  );
}

export default Navbar;
