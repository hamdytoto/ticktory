import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import LoginHeader from "../../layouts/Navbar/LoginHeader";
import {
  useVerifyUserMutation,
  useVerifyUserResendMutation,
  useValidatePasswordMutation,
} from "../../redux/feature/auth/authApiSlice";

const OtpVerification = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { email, type } = location.state || {};

  const [verifyUser, { isLoading: isVerifying }] = useVerifyUserMutation();
  const [verifyUserResend] = useVerifyUserResendMutation();
  const [validatePassword, { isLoading: isResetting }] = useValidatePasswordMutation();

  // Handle OTP input change
  const handleInputChange = (index, value) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index] = value;
        return newOtp;
      });

      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle backspace key press
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Countdown timer for resend OTP
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  // Handle OTP verification
  const handleVerify = async () => {
    if (otp.some((digit) => digit === "")) {
      toast.error("Please enter all 4 digits");
      return;
    }

    try {
      const verificationData = { handle: email, code: otp.join("") };
      if (type === "verify") {
        await verifyUser(verificationData).unwrap();
        toast.success("Verification successful 🎉");
        setTimeout(() => navigate("/auth/login"), 1500);
      } else if (type === "reset") {
        await validatePassword(verificationData).unwrap();
        toast.success("OTP Verified ✅ Redirecting...");
        setTimeout(() => navigate("/auth/new-password", { state: { email:email ,otp:otp.join("") } }), 1500);
      }
    } catch (error) {
      const errorMessage = error?.data?.data?.code === "Invalid verification code"
        ? "Invalid OTP! Please try again ❌"
        : error?.data?.message || "Verification failed ❌";
      toast.error(errorMessage);
    }
  };

  // Handle Resend OTP
  const handleResendOtp = async () => {
    setTimeLeft(60);
    setCanResend(false);

    try {
      await verifyUserResend({ handle: email });
      toast.info("New OTP sent to your email 📩");
    } catch (error) {
      toast.error(error?.data?.message || "Resend OTP failed ❌");
    }
  };

  return (
    <>
      <LoginHeader />
      <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
        <div className="w-full max-w-md text-center">
          {/* Lock Icon */}
          <div className="flex justify-center mb-4">
            <i className="fas fa-lock text-6xl text-blue-600"></i>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-extrabold text-black mb-2">
            {type === "verify" ? "Enter OTP Code" : "Reset Password OTP"}
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            We have sent a 4-digit OTP to <strong>{email}</strong>. Enter it below to continue.
          </p>

          {/* OTP Input Fields */}
          <div className="flex justify-center gap-3 mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                maxLength="1"
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                aria-label={`OTP Digit ${index + 1}`}
              />
            ))}
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={otp.some((digit) => digit === "") || isVerifying || isResetting}
            className={`w-full font-bold py-3 px-4 rounded-lg transition text-lg mb-4 ${
              otp.some((digit) => digit === "") || isVerifying || isResetting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-900 hover:bg-blue-800 text-white"
            }`}
          >
            {isVerifying || isResetting ? "Verifying..." : "Verify OTP"}
          </button>

          {/* Resend OTP */}
          {canResend ? (
            <button onClick={handleResendOtp} className="text-blue-600 hover:underline text-lg">
              Resend OTP
            </button>
          ) : (
            <p className="text-gray-600 text-lg">Resend OTP in {timeLeft}s</p>
          )}
        </div>
        <ToastContainer position="top-center" autoClose={1500} />
      </div>
    </>
  );
};

export default OtpVerification;
