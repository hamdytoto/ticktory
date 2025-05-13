/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext.jsx";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Logo from "../../images/logo bg-black.png";
import { menuConfig } from "./menuConfig.jsx";
import getUserRole from "../../context/userType.js";
import { useTranslation } from "react-i18next";

export default function Sidebar({ activePage, setActivePage }) {
    const { user } = useUser();
    const { t } = useTranslation();
    const isRTL = document.documentElement.dir === "rtl";
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.clear();
        navigate("/auth/login");
    };

    return (
        <>
            {/* Sidebar */}
            <aside
                className={`fixed top-0 ${isRTL ? "right-0" : "left-0"} z-40 h-screen pt-5 w-20 md:w-64 bg-[#03091E] text-[#B3B3B3] border-gray-700 transition-all duration-300`}
            >
                <div className="h-full px-3 pb-4 overflow-y-auto flex flex-col justify-between">
                    <div>
                        {/* Logo */}
                        <div className="flex justify-center md:justify-start items-center px-2">
                            <img src={Logo} className="w-10 md:w-40 mb-6" alt="Logo" />
                        </div>

                        {/* Sidebar Menu */}
                        <ul className="space-y-2 font-medium mt-8">
                            {menuConfig[getUserRole(user.type)]?.map((item) => (
                                <li key={item.id} className="mt-5 ">
                                    <button
                                        onClick={() => setActivePage(item.id)}
                                        className={`flex w-full items-center p-3.5 rounded-lg transition cursor-pointer
                                            ${activePage === item.id ? "bg-[#051754] text-white" : "hover:bg-[#051754]"}`}
                                    >
                                        <div className="flex justify-center w-6">{item.icon}</div>
                                        <span className="ms-3 hidden md:inline">{t(item.labelKey)}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Logout Button */}
                    <div className="mb-4">
                        <button
                            onClick={handleSignOut}
                            className="flex items-center p-2 rounded-lg text-red-600 transition hover:bg-[#051754] hover:text-white"
                        >
                            <div className="flex justify-center w-6"><ExitToAppIcon /></div>
                            <span className="ms-3 hidden md:inline">{t("logout")}</span>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}