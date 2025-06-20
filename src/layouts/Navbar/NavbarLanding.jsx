import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../../images/logo bg-black.png";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../../i18n/languageSelector";
import { isLoggedIn } from "../../Components/utils/auth";
export default function NavbarLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <nav className="fixed top-0 z-50 w-full bg-[#0b0f1a] py-4 shadow-md">
      <div className="container mx-auto px-10 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src={logo} className="h-10" alt="Ticketing System Logo" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation Links */}
        <div
          className={`md:flex md:items-center md:space-x-8 absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-[#0b0f1a] md:bg-transparent p-5 md:p-0 transition-all duration-300 ${menuOpen ? "block" : "hidden"}`}
        >
          <ScrollLink
            to="home"
            smooth={true}
            className="block md:inline text-white text-lg hover:text-gray-400 transition py-2 md:py-0 md:px-4"
          >
            {t("landing.home")}
          </ScrollLink>
          <ScrollLink
            to="services"
            smooth={true}
            className="block md:inline text-white text-lg hover:text-gray-400 transition py-2 md:py-0 md:px-4"
          >
            {t("landing.services")}
          </ScrollLink>
          <Link
            to="/about"
            className="block md:inline text-white text-lg hover:text-gray-400 transition py-2 md:py-0 md:px-4"
          >
            {t("landing.about")}
          </Link>
          <LanguageSelector />
          {/* Sign In Button inside menu for small screens */}
          <Link
            to={! isLoggedIn() ? "/auth/login" : "/dashboard"}
            className="block md:hidden bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-6 py-2 w-full text-center rounded-[16px] text-lg font-medium shadow-md hover:opacity-90 transition mt-4"
          >
            {t(! isLoggedIn() ? "landing.signin" : "landing.dashboard")}
          </Link>
        </div>

        {/* Sign In Button for larger screens */}
        <Link
          to={! isLoggedIn() ? "/auth/login" : "/dashboard"}
          className="hidden md:inline bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-6 py-2 rounded-[16px] text-lg font-medium shadow-md hover:opacity-90 transition md:ml-4"
        >
          {t(! isLoggedIn() ? "landing.signin" : "landing.dashboard")}
        </Link>
      </div>
    </nav>
  );
}
