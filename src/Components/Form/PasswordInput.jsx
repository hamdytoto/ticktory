/* eslint-disable react/prop-types */
import { FaEye, FaEyeSlash } from "react-icons/fa";
import InputField from "./InputField";

const PasswordInput = ({
  label,
  value,
  onChange,
  showPassword,
  setShowPassword,
  iconPositionClass,
  placeholder,
  error,
}) => (
  <div className="relative">
    <label className="block text-sm font-medium mb-2 text-gray-700">
      {label}
    </label>
    <div className="relative">
      <InputField
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-3 pl-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        error={error}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 ${iconPositionClass}`}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  </div>
);

export default PasswordInput;

