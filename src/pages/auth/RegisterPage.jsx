import RegisterHeader from "../../layouts/Navbar/RegisterHeader";
import Register from "../../modules/Auth/Register/Register";

const RegisterPage = () => {
  return (
    <div className="flex flex-col h-100vh">
      <RegisterHeader />
      <main className="pt-20"> {/* offset for fixed header */}
        <Register />
      </main>
    </div>
  );
};

export default RegisterPage;
