import { useEffect } from "react";
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

  const { page = "dashboard" } = useParams(); // from URL
  const navigate = useNavigate();

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
      <Sidebar activePage={page} setActivePage={handlePageChange} />
      <main className="sm:ms-64 w-full responsive-fill transition-all duration-300">
        <Navbar UserName={profile?.name} Image={profile?.avatar} setActivePage={handlePageChange} />
        <div className="p-8 mt-14 ">
          {pageComponent}
          {/* <Outlet /> */}
        </div>
      </main>
    </div>
  );
}
