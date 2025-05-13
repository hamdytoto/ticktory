import { Link } from 'react-router-dom';
import hexagonBg from '../../images/hex-pattern.png';
import dash from '../../images/dash.png';
import AnimatedText from './AnimatedText.jsx';

const MainSection = () => {
  return (
    <>
      {/*  Main section  */}
      <div
        className="relative text-white py-0 pb-100 min-h-screen flex flex-col justify-center items-center text-center px-4 overflow"
        style={{ background: 'linear-gradient(to bottom,#00001c, #000046)' }}
        id='home' // Moves the whole section up
      >
        {/* Hexagonal background effect */}
        <div>
          <img src={hexagonBg} className="absolute inset-0 w-[50%] h-[50%] object-cover opacity-50" alt="Hexagonal Background" />
          <img src={hexagonBg} className="absolute inset-y-0 w-[50%] h-[50%] object-cover opacity-50" alt="Hexagonal Background" />
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold mt-0 md:mt-16 leading-tight relative z-10">
          Turn Queries into <br className="hidden md:block" />
          Resolutions
          <AnimatedText/>
        </h1>
        <p className="text-lg md:text-xl mt-4 max-w-2xl text-gray-300 relative z-10">
          Effortlessly manage customer queries and deliver quick solutions <br className="hidden md:block" />
          with our intuitive support ticketing system.
        </p>

        {/* Navigation buttons */}
        <div className="mt-8 flex flex-col md:flex-row items-center gap-4 relative z-10">
          <Link
            className="px-8 py-3 rounded-[16px] text-white text-lg font-semibold shadow-lg transition duration-300 bg-gradient-to-r from-blue-500 to-cyan-400"
            to="/auth/login"
          >
            Sign in
          </Link>
          <Link
            className="px-8 py-3 rounded-[16px] text-lg font-semibold text-cyan-400 border-2 border-cyan-400 transition duration-300 hover:bg-cyan-400 hover:text-white"
            to="/auth/register"
          >
            Submit Ticket
          </Link>
        </div>


        {/* Dashboard Image */}
        <div className="hidden md:block absolute bottom-[0%] left-1/2 transform -translate-x-1/2 w-11/12 sm:w-3/4 md:w-3/5 lg:w-1/2" style={{ bottom: '-30%' }}>
          <img src={dash} className="mx-auto shadow-2xl rounded-lg" alt="Dashboard Preview" />
        </div>
      </div>

    </>
  )
}

export default MainSection
