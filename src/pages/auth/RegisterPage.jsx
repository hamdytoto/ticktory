import RegisterHeader from "../../layouts/Navbar/RegisterHeader";
import Register from "../../modules/Auth/Register/Register";

const RegisterPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <RegisterHeader />
      <main className=""> {/* offset for fixed header */}
        <Register />
      </main>
    </div>
  );
};

export default RegisterPage;
