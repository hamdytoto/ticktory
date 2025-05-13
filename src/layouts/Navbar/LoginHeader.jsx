import { Link } from "react-router-dom";
import logo from "../../images/logo bg-black.png";

const LoginHeader = () => {
  return (
    <div className="w-full absolute top-0 left-0 py-4 bg-transparent shadow-md  ">
      <div className="container mx-auto flex justify-between items-center px-8">
        <div>
          <Link to="/"><img src={logo} alt="Ticketing System Logo" className="h-10" /></Link>
        </div>

        <Link
          to="/auth/register"
          className="bg-[#0A0F1A] text-white px-6 py-2 rounded-full text-sm hover:bg-gray-800 transition border border-gray-700"
        >
          Don&apos;t have an account? <span className="text-blue-400">Apply Now</span>
        </Link>
      </div>
    </div>
  );
};

export default LoginHeader;
