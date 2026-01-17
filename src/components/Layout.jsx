import AuthContext from "@/context/AuthContext.jsx";
import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import { InsightContext } from "@/context/InsightContext.jsx";
import { SidebarProvider } from "./ui/sidebar.jsx";
import { AppSidebar } from "./AppSidebar.jsx";
import { Bounce, ToastContainer } from "react-toastify";
import { IsInsightShownContext } from "@/context/IsInsightShowContext.jsx";
import InsightCard from "@/components/InsightCard.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";
import { notifyUser, toastType } from "@/utils/ToastNotifications.js";
import LoadingDots from "./LoadingDots.jsx";
import { X } from "lucide-react";

function Layout() {
  const { user } = useContext(AuthContext);
  const { insights, setInsights } = useContext(InsightContext);
  const [isLoading, setIsLoading] = useState(true);
  const { isInsightShown, setIsInsightShown } = useContext(
    IsInsightShownContext,
  );

  const getInsight = async () => {
    try {
      const token = await user.getIdToken();
      const response = await fetch("http://localhost:3000/insight", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      const insightsData = await response.json();
      if (response.status != 200) {
        notifyUser(insightsData.error, toastType.warn);
        setIsInsightShown(false);
      } else {
        if (insightsData.data.length != 0) {
          setInsights(insightsData.data);
        } else {
          notifyUser(insightsData.message, toastType.info);
          setIsInsightShown(false);
        }
      }
      setIsLoading(false);
    } catch (err) {
      notifyUser("Some error occured", toastType.warn);
      console.log(err);
    }
  };

  useEffect(() => {
    if (isInsightShown) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isInsightShown]);

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <div className="w-full flex flex-col">
          <header>
            <Navbar getInsight={getInsight} />
          </header>
          <main>
            <>
              {isInsightShown && (
                <section className="fixed inset-0 z-100 flex items-center justify-center">
                  {/* Backdrop */}
                  <div
                    className="animate-in fade-in duration-200 absolute inset-0 bg-[#3A3A3A]/30 backdrop-blur-md flex justify-end items-start p-6"
                    onClick={() => setIsInsightShown(false)} 
                  >
                    <button
                      className="p-2 transition-colors hover:bg-white/10 rounded-full cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsInsightShown(false);
                      }}
                    >
                      <X
                        size={28}
                        strokeWidth={2.5}
                        className="text-amber-50"
                      />
                    </button>
                  </div>

                  {/* Swiper Container */}
                  {isLoading ? (
                    <LoadingDots />
                  ) : (
                    <div className="relative w-full max-w-2xl py-10">
                      <Swiper
                        modules={[Pagination, Navigation]}
                        spaceBetween={20}
                        slidesPerView={1}
                        centeredSlides={true}
                        pagination={{ clickable: true }}
                        className="insight-swiper animate-in fade-in duration-200"
                      >
                        {insights.map((insight, index) => (
                          <SwiperSlide
                            key={index}
                            className="flex justify-center p-4"
                          >
                            <InsightCard
                              insights={insight.insights}
                              type={insight.insightType}
                              subData={insight.subData}
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  )}
                </section>
              )}
            </>
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </>
  );
}

export default Layout;
