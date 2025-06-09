import { useState } from "react";
import { Link } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useTranslation } from "react-i18next";
import { Badge } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NotificationModal from "../../modules/Notifications/Notification";
import { useGetUnreadNotifiQuery } from "../../redux/feature/notifications/notifi.apislice";
import LanguageSelector from "../../i18n/languageSelector";
import '../../index.css'

// eslint-disable-next-line react/prop-types
export default function Navbar({ UserName, Image, setActivePage, isCollapsed, isMobile, isMobileOpen }) {
  const { t } = useTranslation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { data, refetch } = useGetUnreadNotifiQuery();
  const unreadCount = data?.data?.unreadNotificationsCount;

  const marginClass =
    isMobile
      ? isMobileOpen
        ? "ms-20"
        : "ms-4"
      : isCollapsed
      ? "ms-20"
      : "ms-64";

  return (
    <nav className=" fixed top-0 left-0 h-20 z-50 w-full bg-white border-b border-gray-200 px-4 md:px-6 py-3 shadow-md flex items-center justify-between">
      {/* Left Section */}
      <div className={`naav transition-all duration-300 ${marginClass}`}>
        <p className="text-sm md:text-lg font-semibold text-gray-700">
          {t("greeting")} {UserName}
        </p>
        <p className="text-xs md:text-sm text-gray-500">
          {t("date")}
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        <LanguageSelector />

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setIsNotificationOpen((prev) => !prev);
              refetch();
            }}
            className="relative text-gray-500 hover:text-gray-700"
            aria-label="Toggle notifications"
          >
            <Badge
              badgeContent={unreadCount}
              color="error"
              overlap="circular"
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <NotificationsIcon />
            </Badge>
          </button>

          {isNotificationOpen && (
            <div className="absolute right-0 mt-2">
              <NotificationModal />
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            className="flex items-center gap-2"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            aria-label="Toggle profile menu"
          >
            <img className="w-10 h-10 rounded-full border-2 border-gray-300" src={Image} alt="User" />
            <span className="text-sm md:text-base text-gray-700 font-medium">{UserName}</span>
            <ExpandMoreIcon className="text-gray-500" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 border border-gray-100">
              <button
                onClick={() => setActivePage("profile")}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {t("profile")}
              </button>
              <Link to="/dashboard/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                {t("setting")}
              </Link>
              <Link to="/auth/login" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                {t("logout")}
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}