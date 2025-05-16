/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Logo from "../../images/logo bg-black.png";
import { menuConfig } from "./menuConfig";
import getUserRole from "../../context/userType";
import { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ViewSidebarIcon from "@mui/icons-material/ViewSidebar";
import { useTranslation } from "react-i18next";

export default function Sidebar({
    activePage,
    setActivePage,
    isCollapsed,
    setIsCollapsed,
    isMobileOpen,
    setIsMobileOpen,
}) {
    const { user } = useUser();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const isRTL = document.documentElement.dir === "rtl";

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isMobile = windowWidth <= 700;

    const handleSignOut = () => {
        localStorage.clear();
        navigate("/auth/login");
    };

    const sidebarBaseClasses = `fixed top-0 ${isRTL ? "right-0" : "left-0"} z-60 h-screen pt-5 bg-[#03091E] text-[#B3B3B3] border-r border-gray-700 transform transition-transform duration-300`;

    const sidebarSizeClass = isMobile
        ? isMobileOpen
            ? isCollapsed
                ? "translate-x-0 w-20"
                : "translate-x-0 w-64"
            : isRTL
                ? "translate-x-full"
                : "-translate-x-full"
        : isCollapsed
            ? "translate-x-0 w-20"
            : "translate-x-0 w-64";

    const showText = !isCollapsed;

    return (
        <>
            {/* Mobile toggle button */}
            {isMobile && (
                <button
                    className={`fixed top-4 ${isRTL ? "right-4" : "left-4"} z-100 bg-gray-900 text-white p-2 rounded-full shadow-lg`}
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                >
                    {isMobileOpen ? (
                        <CloseIcon fontSize="medium" />
                    ) : (
                        <MenuIcon fontSize="medium" />
                    )}
                </button>
            )}

            {/* Sidebar */}
            <aside className={`${sidebarBaseClasses} ${sidebarSizeClass}`}>
                <div className="h-full px-3 pb-4 overflow-y-auto flex flex-col justify-between">
                    {/* Logo and menu */}
                    <div>
                        <div className="flex justify-between items-center px-2 mb-6">
                            <img src={Logo} className="w-32" alt="Logo" />
                        </div>

                        <ul className="space-y-2 font-medium mt-8">
                            {menuConfig[getUserRole(user.type)]?.map((item) => (
                                <li key={item.id} className="mt-5">
                                    <button
                                        onClick={() => {setActivePage(item.id);
                                            setIsMobileOpen(false);
                                        }}
                                        className={`flex w-full items-center p-3.5 rounded-lg transition ${activePage === item.id
                                                ? "bg-[#051754] text-white"
                                                : "hover:bg-[#051754]"
                                            }`}
                                    >
                                        <div className="flex justify-center w-6">{item.icon}</div>
                                        <span className={`ms-3 ${showText ? "inline" : "hidden"}`}>
                                            {t(item.labelKey)}
                                        </span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Bottom buttons */}
                    <div className="mb-4 flex flex-col gap-4 items-start">
                        {/* Collapse toggle */}
                        <button
                            onClick={() => setIsCollapsed((prev) => !prev)}
                            className="flex items-center p-2 rounded-lg text-gray-400 hover:bg-[#051754] hover:text-white w-full"
                        >
                            <div className="flex justify-center w-6">
                                <ViewSidebarIcon />
                            </div>
                            <span className={`ms-3 ${!isCollapsed ? "inline" : "hidden"}`}>
                                {t("collapse")}
                            </span>
                        </button>

                        {/* Sign out */}
                        <button
                            onClick={handleSignOut}
                            className="flex items-center p-2 rounded-lg text-red-600 hover:bg-[#051754] hover:text-white w-full"
                        >
                            <div className="flex justify-center w-6">
                                <ExitToAppIcon />
                            </div>
                            <span className={`ms-3 ${showText ? "inline" : "hidden"}`}>
                                {t("logout")}
                            </span>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}