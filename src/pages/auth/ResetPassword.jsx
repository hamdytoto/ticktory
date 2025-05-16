import { useState } from "react";
import LoginHeader from "../../layouts/Navbar/LoginHeader";
import { useForgetPasswordMutation } from "../../redux/feature/auth/authApiSlice";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";

const ResetPassword = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [forgetPassword] = useForgetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError(t("reset.emailRequired"));
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError(t("reset.invalidEmail"));
      return;
    }

    try {
      await forgetPassword({ handle: email }).unwrap();
      toast.success(t("reset.otpSent"));
      setTimeout(() => {
        navigate("/auth/reset-pass-otp", { state: { email, type: "reset" } });
      }, 1500);
    } catch (error) {
      setError(error?.data?.data?.user || t("reset.failed"));
    }
  };

  return (
    <>
      <LoginHeader />
      <div className="flex flex-col items-center justify-center min-h-screen  bg-white px-4">
        <div className="w-full max-w-md text-center">
          <h2 className="text-3xl font-extrabold text-black mb-3">
            {t("reset.title")}
          </h2>
          <p className="text-lg text-gray-600 mb-6">{t("reset.subtitle")}</p>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="text-left">
              <label className="block text-base font-semibold text-gray-700 mb-1">
                {t("reset.emailLabel")}
              </label>
              <div className="relative mt-2">
                <i className="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
                <input
                  type="email"
                  placeholder={t("reset.emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg"
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition text-lg"
            >
              {t("reset.sendButton")}
            </button>
          </form>
          <ToastContainer autoClose={1500} position="top-center" />
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
