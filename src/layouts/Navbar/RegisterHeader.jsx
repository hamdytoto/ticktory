import { Link } from "react-router-dom";
import logo from "../../images/logo-bg-white.png";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../../i18n/languageSelector";

const RegisterHeader = () => {
  const { t } = useTranslation();

  return (
    <header className="w-full py-4 lg:px-50 bg-transparent shadow-sm z-50 border-b border-gray-200">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-4 md:px-8 space-y-3 sm:space-y-0">
        
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt={t("register.logoAlt")} className="h-10" />
        </Link>

        {/* Sign-in Button + Language Selector */}
        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <Link
            to="/auth/login"
            className="bg-[#0A0F1A] text-white px-6 py-2 rounded-full text-sm hover:bg-gray-800 transition border border-gray-700 text-center"
          >
            {t("register.alreadyHaveAccount")}{" "}
            <span className="text-blue-400">{t("register.signIn")}</span>
          </Link>
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
};

export default RegisterHeader;
