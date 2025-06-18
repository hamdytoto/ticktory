import { useEffect, useState } from "react";
import { useUser } from "../../../context/userContext.jsx";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../../redux/feature/auth/authApiSlice.js";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import "react-toastify/dist/ReactToastify.css";
import useFirebaseLogic from "../../Notifications/useFirebaseLogic.js";

const Login = () => {
  const { t } = useTranslation();
  const { setUser } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const { fcmToken, requestNotificationPermission } = useFirebaseLogic();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      navigate("/dashboard");
    }
  }, []);
  useEffect(() => {
    requestNotificationPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const schema = z.object({
    email: z.string().email(t("login.invalidEmail")),
    pass: z.string().min(4, t("login.passwordMin")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      pass: "",
    },
  });

  const save = async (data) => {
    try {
      const response = await login({
        email: data.email,
        password: data.pass,
        fcm_token: fcmToken,
      }).unwrap();

      toast.success(t("login.success"));

      localStorage.setItem("token", response.data.token);
      Cookies.set("accessToken", response.data.token);
      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      toast.error(error.data?.message || t("login.failed"));

      if (error.data.code === 403 && error.data.forbidding_reason == 0) {
        navigate("/auth/verify-user", {
          state: {
            email: data.email,
            redirectFromType: "login",
            type: "verify",
          },
        });
      }
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gray-100">
      <div className="flex flex-col md:flex-row w-full h-full">
        {/* Left Side */}
        <div className="md:w-2/5 flex flex-col items-center justify-center text-white bg-[#03091E] p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-center">
            {t("login.welcome")}
          </h1>
          <p className="text-lg text-center leading-relaxed">
            {t("login.keepConnected")}
          </p>
        </div>

        {/* Right Side */}
        <div className="md:w-3/5 flex flex-col justify-center items-center bg-white px-6 md:px-12 py-12 w-full">
          <div className="w-full max-w-md">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 text-center mb-4">
              {t("login.signIn")}
            </h2>
            <p className="text-md text-center text-gray-600 mb-6">
              {t("login.description")}
            </p>

            <form onSubmit={handleSubmit(save)} className="space-y-6">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  {t("login.email")}
                </label>
                <div className="relative mt-2">
                  <i className="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
                  <input
                    {...register("email")}
                    type="email"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg"
                    placeholder={t("login.emailPlaceholder")}
                  />
                </div>
                {errors.email && (
                  <small className="text-red-500">{errors.email.message}</small>
                )}
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  {t("login.password")}
                </label>
                <div className="relative mt-2">
                  <i className="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
                  <input
                    {...register("pass")}
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg"
                    placeholder={t("login.passwordPlaceholder")}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 text-lg"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i
                      className={
                        showPassword ? "fas fa-eye-slash" : "fas fa-eye"
                      }
                    ></i>
                  </button>
                </div>
                {errors.pass && (
                  <small className="text-red-500">{errors.pass.message}</small>
                )}
              </div>

              {/* Remember Me + Forgot */}
              <div className="flex justify-between items-center text-sm text-gray-600">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />{" "}
                  {t("login.remember")}
                </label>
                <Link
                  to="/auth/forget-password"
                  className="text-blue-500 hover:underline"
                >
                  {t("login.forgot")}
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 text-lg"
                disabled={isLoading}
              >
                {isLoading ? t("login.signingIn") : t("login.signIn")}
              </button>
            </form>

            {/* Sign Up */}
            <div className="mt-4 text-center">
              <span className="text-gray-600">{t("login.noAccount")} </span>
              <Link
                to="/auth/register"
                className="text-blue-500 font-semibold hover:underline"
              >
                {t("login.apply")}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={1500} />
    </div>
  );
};

export default Login;
