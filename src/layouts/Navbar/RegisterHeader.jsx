import { Link } from "react-router-dom";
import logo from "../../images/logo-bg-white.png";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../../i18n/languageSelector";

const RegisterHeader = () => {
  const { t } = useTranslation();

  return (
    <header className="w-full fixed top-0 left-0 bg-white shadow-sm z-50">
      <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4 sm:px-8 py-4 gap-4 sm:gap-0">
        
        {/* Logo */}
        <Link to="/" className="flex justify-center sm:justify-start w-full sm:w-auto">
          <img
            src={logo}
            alt={t("register.logoAlt")}
            className="h-10 object-contain"
          />
        </Link>

        {/* Sign-in Button */}
        <div className="w-full sm:w-auto flex justify-center sm:justify-end items-center gap-4">
          <Link
            to="/auth/login"
            className="bg-[#0A0F1A] text-white px-4 py-2 text-sm rounded-2xl hover:bg-[#1A1F2A] transition duration-200"
          >
            {t("register.alreadyHaveAccount")}{" "}
            <span className="text-blue-400 underline">{t("register.signIn")}</span>
          </Link>
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
};

export default RegisterHeader;
