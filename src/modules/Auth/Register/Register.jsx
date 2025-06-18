import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useRegisterApiMutation } from "../../../redux/feature/auth/authApiSlice.js";
import schema from "./Schema.js";
import HelloSection from "./HelloSection.jsx";
import SignInLink from "./SignInLink.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useApiCallback,
  useValidation,
} from "../../../Components/utils/validation.js";
import InputField from "../../../Components/Form/InputField.jsx";

export default function Register() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userInputs, setUserInputs] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [registerApi, { isLoading }] = useRegisterApiMutation();
  const { handleApiCallback } = useApiCallback();
  const validationErrors = useValidation().getErrors("register");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      pass: "",
      confirmPass: "",
    },
  });

  const onSubmit = async (data) => {
    await handleApiCallback(async () => {
      await registerApi({
        name: data.name,
        email: data.email,
        password: data.pass,
        password_confirmation: data.confirmPass,
      }).unwrap();
      toast.success(t("register.success"));
      reset();
      setTimeout(() => {
        navigate("/auth/verify-user", {
          state: {
            email: data.email,
            type: "verify",
            redirectFromType: "register",
          },
        });
      }, 3000);
    }, "register");
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gray-200">
      <div className="flex flex-col md:flex-row w-full h-full">
        {/* Left - Register Form */}
        <div className="md:w-7/12 flex flex-col justify-center items-center bg-white px-6 md:px-12 py-12 w-full text-[#03091E]">
          <div className="w-full max-w-md">
            <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-4">
              {t("register.createAccount")}
            </h2>
            <p className="text-md text-center text-gray-600 mb-6">
              {t("register.subtitle.part1")} <br />
              <span className="text-blue-600 font-semibold">
                {t("register.subtitle.part2")}
              </span>
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  {t("register.name")}
                </label>
                <InputField
                  {...register("name")}
                  value={userInputs.name}
                  onChange={(e) =>
                    setUserInputs((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  type="text"
                  className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg"
                  placeholder={t("register.namePlaceholder")}
                  error={validationErrors["name"]}
                />
                {errors.name && (
                  <small className="text-red-500">{errors.name.message}</small>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  {t("register.email")}
                </label>
                <div className="relative mt-2">
                  <InputField
                    {...register("email")}
                    value={userInputs.email}
                    onChange={(e) =>
                      setUserInputs((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    type="email"
                    className="w-full px-4 pr-12 pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg"
                    placeholder={t("register.emailPlaceholder")}
                    error={validationErrors["email"]}
                  />
                  <i className="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"></i>
                </div>
                {errors.email && (
                  <small className="text-red-500">{errors.email.message}</small>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  {t("register.password")}
                </label>
                <div className="relative mt-2">
                  <input
                    {...register("pass")}
                    value={userInputs.password}
                    onChange={(e) =>
                      setUserInputs((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 pr-12 pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg"
                    placeholder={t("register.passwordPlaceholder")}
                  />
                  <i className="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"></i>
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

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  {t("register.confirmPassword")}
                </label>
                <div className="relative mt-2">
                  <input
                    {...register("confirmPass")}
                    value={userInputs.password_confirmation}
                    onChange={(e) =>
                      setUserInputs((prev) => ({
                        ...prev,
                        password_confirmation: e.target.value,
                      }))
                    }
                    type={showConfirmPassword ? "text" : "password"}
                    className="w-full px-4 pr-12 pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg"
                    placeholder={t("register.confirmPasswordPlaceholder")}
                  />
                  <i className="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"></i>
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 text-lg"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <i
                      className={
                        showConfirmPassword ? "fas fa-eye-slash" : "fas fa-eye"
                      }
                    ></i>
                  </button>
                </div>
                {errors.confirmPass && (
                  <small className="text-red-500">
                    {errors.confirmPass.message}
                  </small>
                )}
              </div>

              {/* Submit */}
              <button
                disabled={isLoading}
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 text-lg"
              >
                {t("register.submit")}
              </button>
            </form>

            <SignInLink />
            <ToastContainer position="top-right" autoClose={3000} />
          </div>
        </div>
        <HelloSection />
      </div>
    </div>
  );
}
