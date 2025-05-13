
import Footer from '../../layouts/Footer/Footer';
import NavbarLanding from '../../layouts/Navbar/NavbarLanding';
import MainSection from '../../layouts/LandingPage/MainSection';
import ServicesSection from '../../layouts/LandingPage/ServicesSection';
import CreateTicketL from '../../layouts/LandingPage/CreateTicketL';

export default function LandingPage() {
  return (
    <>
      <NavbarLanding />
      <MainSection />
      <ServicesSection />
      <CreateTicketL />
      <Footer />
    </>
  );
}
