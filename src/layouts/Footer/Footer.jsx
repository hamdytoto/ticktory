import { Link as ScrollLink } from 'react-scroll';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#0a0f1d] text-white py-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col gap-10 md:gap-0 md:flex-row justify-between items-start md:items-start">

        {/* Left Section - Logo & Description */}
        <div className="flex-1 mb-6 md:mb-0">
          <h2 className="text-2xl font-bold">
            <span className="text-blue-400">Ticketing</span> System
          </h2>
          <p className="text-gray-400 mt-3 text-sm max-w-xs">
            Platform for Technical Support and providing solutions for our customer queries.
          </p>
        </div>

        {/* Center Section - Navigation Links */}
        <div className="flex flex-1 flex-col sm:flex-row justify-start gap-8">
          {/* Section 1 */}
          <div>
            <h4 className="font-semibold mb-2">Navigation</h4>
            <ul className="space-y-1 text-gray-400 text-sm">
              <li>
                <ScrollLink to="home" smooth={true} className="hover:text-white cursor-pointer transition">Home</ScrollLink>
              </li>
              <li>
                <ScrollLink to="services" smooth={true} className="hover:text-white cursor-pointer transition">Services</ScrollLink>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">About Us</Link>
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div>
            <h4 className="font-semibold mb-2">Account</h4>
            <ul className="space-y-1 text-gray-400 text-sm">
              <li>
                <Link to="/auth/login" className="hover:text-white transition">Login</Link>
              </li>
              <li>
                <Link to="/auth/register" className="hover:text-white transition">Register</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Section - Social Media */}
        <div className="flex-1">
          <h4 className="font-semibold mb-2">Follow Us</h4>
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
        © 2025 Ticketing System. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
