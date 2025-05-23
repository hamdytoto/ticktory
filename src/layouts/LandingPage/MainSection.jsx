import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import hexagonBg from '../../images/hex-pattern.png';
import dash from '../../images/dash.png';
import AnimatedText from './AnimatedText.jsx';

const MainSection = () => {
  const { t } = useTranslation();

  return (
    <section
      id="home"
      className="relative text-white min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8"
      style={{ background: 'linear-gradient(to bottom,#00001c, #000046)' }}
    >
      <img
        src={hexagonBg}
        className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
        alt={t('main.bgAlt')}
      />

      <h1 className="text-[clamp(1.8rem,6vw,3.5rem)] font-extrabold leading-tight z-10 mt-20 sm:mt-32">
        {t('main.headline1')} <br className="hidden sm:block" />
        {t('main.headline2')}
        <AnimatedText />
      </h1>

      <p className="text-[clamp(1rem,2.5vw,1.25rem)] mt-4 max-w-2xl text-gray-300 z-10">
        {t('main.description')}
      </p>

      <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-4 z-10">
        <Link
          className="w-44 px-6 py-2 sm:px-8 sm:py-3 rounded-xl text-white font-semibold shadow-lg bg-gradient-to-r from-blue-500 to-cyan-400"
          to="/auth/login"
        >
          {t('main.signin')}
        </Link>
        <Link
          className="w-44 px-6 py-2 sm:px-8 sm:py-3 rounded-xl text-cyan-400 border-2 border-cyan-400 font-semibold hover:bg-cyan-400 hover:text-white"
          to="/auth/register"
        >
          {t('main.submitTicket')}
        </Link>
      </div>

      <div className="relative w-full flex justify-center mt-12 sm:mt-20 z-10 px-4">
        <img
          src={dash}
          className="w-full sm:w-4/5 md:w-3/5 max-w-[700px] shadow-2xl rounded-lg"
          alt={t('main.dashboardAlt')}
        />
      </div>
    </section>
  );
};

export default MainSection;
