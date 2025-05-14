import { useState, useEffect } from "react";
import { useUser } from "../../context/userContext";
import Sidebar from "../../layouts/SideBar/SideBar";
import Navbar from "../../layouts/Navbar/NavbarDash";
import { dashboardContent } from "./DashContent";
import getUserRole from "../../context/userType";
import { useGetProfileQuery } from "../../redux/feature/auth/authApiSlice";
import LoadingSpinner from "../../common/Loadingspinner";

export default function Home() {
  const { user } = useUser();
  const { data: response, refetch, isFetching } = useGetProfileQuery();
  const profile = response?.data;

  const isRTL = document.documentElement.dir === "rtl";
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [activePage, setActivePage] = useState(() => {
    return localStorage.getItem("activePage") || "dashboard";
  });

  // تحديث عرض الشاشة
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // حفظ الصفحة النشطة
  useEffect(() => {
    localStorage.setItem("activePage", activePage);
  }, [activePage]);

  // جلب البيانات عند وجود المستخدم
  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user, refetch]);

  if (!user || isFetching) return <LoadingSpinner />;

  const role = getUserRole(user.type);
  const pageComponent = dashboardContent[role]?.[activePage] || <p>Unauthorized</p>;

  return (
    <div className="flex flex-row-reverse" dir={isRTL ? "rtl" : "ltr"}>
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      <main
        className={`transition-all duration-300 w-full ${
          windowWidth > 700
            ? isCollapsed
              ? isRTL
                ? "pr-20"
                : "pl-20"
              : isRTL
              ? "pr-64"
              : "pl-64"
            : ""
        }`}
      >
        <Navbar
          UserName={profile?.name}
          Image={profile?.avatar}
          setActivePage={setActivePage}
          isCollapsed={isCollapsed}
          isMobile={windowWidth <= 700}
          isMobileOpen={windowWidth <= 700 && isMobileOpen}
        />

        <div className="p-8 mt-14">{pageComponent}</div>
      </main>
    </div>
  );
}