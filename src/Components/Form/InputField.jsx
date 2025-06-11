/* eslint-disable react/prop-types */
 const InputField = ({ type, name, value, onChange, placeholder, icon }) => (
    <div className="relative mb-4">
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        {icon}
    </div>
);

export default InputField;