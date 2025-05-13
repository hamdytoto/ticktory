import { useState } from "react";
import LoginHeader from "../../layouts/Navbar/LoginHeader";
import { useResetPasswordMutation } from "../../redux/feature/auth/authApiSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';

const NewPassword = () => {
    // State for password fields
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    // Redux mutation hook
    const [resetPassword, { isLoading }] = useResetPasswordMutation();
    
    // Get state from location
    const { state } = useLocation();
    console.log(state);
    const navigate = useNavigate();
    // Get OTP safely
    const otpCode = state?.otp || "";
    
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate input fields
        if (!state?.email) {
            toast.error("Invalid request. Please restart the process.");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            // Call API to reset password
            await resetPassword({
                handle: state.email,
                password,
                password_confirmation: confirmPassword,
                code: otpCode
            }).unwrap();

            toast.success("Password reset successfully!");
            setTimeout(() => navigate("/auth/login"), 1000);
        } catch (error) {
            const errorMessage = error?.data?.message || "An error occurred. Please try again.";
            toast.error(errorMessage);
        }
    };

    return (
        <>
            <LoginHeader />
            <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
                <div className="w-full max-w-md text-center">
                    {/* Title */}
                    <h2 className="text-3xl font-extrabold text-black mb-2">Create New Password</h2>
                    <p className="text-lg text-gray-600 mb-6">
                        Your new password must be different from the previously used password
                    </p>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="w-full">
                        {/* New Password */}
                        <div className="text-left">
                            <label className="block text-sm font-semibold text-gray-700">New Password</label>
                            <div className="relative mt-2">
                                <span className="absolute left-3 top-3 text-gray-400">
                                    <i className="fas fa-lock"></i>
                                </span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    required
                                />
                                <span
                                    className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <i className={showPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
                                </span>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="text-left mt-4">
                            <label className="block text-sm font-semibold text-gray-700">Confirm Password</label>
                            <div className="relative mt-2">
                                <span className="absolute left-3 top-3 text-gray-400">
                                    <i className="fas fa-lock"></i>
                                </span>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Enter Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    required
                                />
                                <span
                                    className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    <i className={showConfirmPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
                                </span>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full mt-6 ${isLoading ? "bg-gray-300 cursor-not-allowed" : "bg-blue-400 hover:bg-blue-500"} text-white font-semibold py-3 px-4 rounded-lg transition text-lg`}
                        >
                            {isLoading ? "Processing..." : "Sign In"}
                        </button>
                    </form>
                    <ToastContainer position="top-center" autoClose={1000} />
                </div>
            </div>
        </>
    );
};

export default NewPassword;
