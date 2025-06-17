import InputError from "./InputError";

/* eslint-disable react/prop-types */
const InputField = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  icon,
  error,
  ...props
}) => (
  <div className="relative mb-4">
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
      {...props}
    />
    {icon}
    <InputError error={error} />
  </div>
);

export default InputField;

