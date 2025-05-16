import Login from "../../modules/Auth/Login/Login"
import LoginHeader from "../../layouts/Navbar/LoginHeader"

const LoginPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <LoginHeader/>
      <Login/>
    </div>
  )
}

export default LoginPage
