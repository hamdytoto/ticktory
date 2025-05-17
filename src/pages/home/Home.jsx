import { useEffect, useState } from "react";
import { useUser } from "../../context/userContext";
import Sidebar from "../../layouts/SideBar/SideBar";
import Navbar from "../../layouts/Navbar/NavbarDash";
import { dashboardContent } from "./DashContent";
import getUserRole from "../../context/userType";
import { useGetProfileQuery } from "../../redux/feature/auth/authApiSlice";
import LoadingSpinner from "../../common/Loadingspinner";
import { useNavigate, useParams } from "react-router-dom";

export default function Home() {
  const { user } = useUser();
  const { data: response, refetch, isFetching } = useGetProfileQuery();
  const profile = response?.data;

  const isRTL = document.documentElement.dir === "rtl";
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { page = "dashboard" } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user, refetch]);

  if (!user || isFetching) return <LoadingSpinner />;

  const role = getUserRole(user.type);
  const pageComponent = dashboardContent[role]?.[page] || <p>Unauthorized</p>;

  const handlePageChange = (newPage) => {
    navigate(`/dashboard/${newPage}`);
  };

  return (
    <div className={`flex ${isRTL ? "flex-row-reverse" : ""}`} dir={isRTL ? "rtl" : "ltr"}>
      <Sidebar
        activePage={page}
        setActivePage={handlePageChange}
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
          setActivePage={handlePageChange}
          isCollapsed={isCollapsed}
          isMobile={windowWidth <= 700}
          isMobileOpen={windowWidth <= 700 && isMobileOpen}
        />

        <div className="py-8 mt-14">{pageComponent}</div>
      </main>
    </div>
  );
}