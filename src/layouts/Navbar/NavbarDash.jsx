import { useState } from "react";
import { Link } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useTranslation } from "react-i18next";
import { Badge } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; // Dropdown arrow
import NotificationModal from "../../modules/Notifications/Notification.jsx"; // Import the NotificationModal component
import { useGetUnreadNotifiQuery } from "../../redux/feature/notifications/notifi.apislice.js";
import LanguageSelector from "../../i18n/languageSelector.jsx";

// eslint-disable-next-line react/prop-types
export default function Navbar({ UserName, Image, setActivePage }) {
  const { t } = useTranslation();
  const isRTL = document.documentElement.dir === "rtl";
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { data, refetch } = useGetUnreadNotifiQuery();
  const unreadCount = data?.data?.unreadNotificationsCount;

  return (
    <nav className={`fixed top-0 ${isRTL ? "right-0 md:right-64" : "left-0 md:left-64"} h-20 z-50 w-full md:w-[calc(100%-16rem)] bg-white border-b border-gray-200 px-4 md:px-6 py-3 shadow-md flex items-center justify-between`}>
      {/* Left Section: Greeting & Date */}
      <div>
        <p className="text-lg font-semibold text-gray-700">{t("greeting")} {UserName}</p>
        <p className="text-xs text-gray-500">{t("date")}</p>
      </div>

      {/* Right Section: Notifications & Profile */}
      <div className="flex items-center gap-6">
        {/* Language Switcher */}
        <LanguageSelector />
        {/* Notification Icon */}
        <div className="relative">
          <button onClick={() => {
            setIsNotificationOpen((prev) => !prev)
            refetch(); // Refetch notifications when the button is clicked
          }} className="relative text-gray-500 hover:text-gray-700">
            <Badge
              badgeContent={unreadCount}
              color="error"
              overlap="circular"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <NotificationsIcon />
            </Badge>
          </button>
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            className="flex items-center gap-2"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <img
              className="w-10 h-10 rounded-full border-2 border-gray-300"
              src={Image}
              alt="User"
            />
            <span className="text-gray-700 font-medium">{UserName}</span>
            <ExpandMoreIcon className="text-gray-500" />
          </button>

          {/* Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 border border-gray-100">
              <button
                onClick={() => setActivePage("profile")}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                {t("profile")}
              </button>
              <Link
                to="/dashboard/settings"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                {t("settings")}
              </Link>
              <Link
                to="/auth/login"
                className="block px-4 py-2 text-red-600 hover:bg-gray-100"
              >
                {t("logout")}
              </Link>
            </div>
          )}
        </div>
      </div>
      {isNotificationOpen && (
        <div
          className={`absolute top-full mt-2 ${isRTL ? 'left-0' : 'right-0'
            } z-50`}
        >
          <NotificationModal />
        </div>
      )}
    </nav>
  );
}
