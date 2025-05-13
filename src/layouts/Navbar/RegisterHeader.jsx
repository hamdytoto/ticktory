import { Link } from "react-router-dom";
import logo from "../../images/logo-bg-white.png";

const RegisterHeader = () => {
  return (
    <div className="w-full absolute top-0 left-0 py-4 bg-transparent shadow-sm ">
      <div className="container mx-auto flex justify-between items-center px-8">
        <Link to="/">
          <img src={logo} alt="Ticketing System Logo" className="h-10" />
        </Link>

        <Link
          to="/auth/login"
          className="bg-[#0A0F1A] text-white px-6 py-2 text-sm"
        >
          Already have an account? <span className="text-blue-400">Sign in</span>
        </Link>
      </div>
    </div>
  );
};

export default RegisterHeader;
