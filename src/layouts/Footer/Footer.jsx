import { Link as ScrollLink } from 'react-scroll';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#0a0f1d] text-white py-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col gap-10 md:gap-0 md:flex-row justify-between items-start md:items-start">

        {/* Left Section - Logo & Description */}
        <div className="flex-1 mb-6 md:mb-0">
          <h2 className="text-2xl font-bold">
            <span className="text-blue-400">{t('footer.logoHighlight')}</span> {t('footer.logoText')}
          </h2>
          <p className="text-gray-400 mt-3 text-sm max-w-xs">
            {t('footer.description')}
          </p>
        </div>

        {/* Center Section - Navigation Links */}
        <div className="flex flex-1 flex-col sm:flex-row justify-start gap-8">
          {/* Section 1 */}
          <div>
            <h4 className="font-semibold mb-2">{t('footer.navigationTitle')}</h4>
            <ul className="space-y-1 text-gray-400 text-sm">
              <li>
                <ScrollLink to="home" smooth={true} className="hover:text-white cursor-pointer transition">
                  {t('footer.nav.home')}
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="services" smooth={true} className="hover:text-white cursor-pointer transition">
                  {t('footer.nav.services')}
                </ScrollLink>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">
                  {t('footer.nav.about')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div>
            <h4 className="font-semibold mb-2">{t('footer.accountTitle')}</h4>
            <ul className="space-y-1 text-gray-400 text-sm">
              <li>
                <Link to="/auth/login" className="hover:text-white transition">
                  {t('footer.account.login')}
                </Link>
              </li>
              <li>
                <Link to="/auth/register" className="hover:text-white transition">
                  {t('footer.account.register')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Section - Social Media */}
        <div className="flex-1">
          <h4 className="font-semibold mb-2">{t('footer.followUs')}</h4>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="hover:text-blue-400 transition text-lg"><i className="fab fa-facebook"></i></a>
            <a href="#" className="hover:text-blue-400 transition text-lg"><i className="fab fa-linkedin"></i></a>
            <a href="#" className="hover:text-blue-400 transition text-lg"><i className="fab fa-pinterest"></i></a>
            <a href="#" className="hover:text-blue-400 transition text-lg"><i className="fab fa-twitter"></i></a>
          </div>
        </div>
      </div>

      {/* Divider & Copyright */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
        © 2025 {t('footer.logoHighlight')} {t('footer.logoText')}. {t('footer.rights')}
      </div>
    </footer>
  );
};

export default Footer;
// This code defines a Footer component for a web application. It includes sections for the logo and description, navigation links, account links, and social media icons. The footer is styled with Tailwind CSS classes and uses the i18next library for internationalization. The component is responsive and adjusts its layout based on screen size.