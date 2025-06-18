import Login from "../../modules/Auth/Login/Login";
import LoginHeader from "../../layouts/Navbar/LoginHeader";
import { useEffect } from "react";

const LoginPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <LoginHeader />
      <Login />
    </div>
  );
};

export default LoginPage;
