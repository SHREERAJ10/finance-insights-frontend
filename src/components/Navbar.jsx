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
      <nav className="w-full h-auto px-4 py-3 border-b border-[#cecece] flex justify-between items-center gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <SidebarTrigger className="shrink-0" />
          <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#3A3A3A] truncate">
            Hi, {username}
          </h1>
        </div>

        <button
          className="whitespace-nowrap px-4 py-2 md:py-2.5 bg-[#272727] text-[#FBFBFB] text-[13px] md:text-base font-medium tracking-wide rounded-xl cursor-pointer hover:bg-[#3a3a3a] active:scale-95 transition-all shrink-0 shadow-sm"
          onClick={() => {
            setIsInsightShown(true);
            getInsight();
          }}
        >
          View Insights
        </button>
      </nav>
    </>
  );
}

export default Navbar;
