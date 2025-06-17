import { t } from "i18next";
import InputError from "./InputError";

const SelectComponent = ({
  options,
  value,
  onChange,
  placeholder = "select_an_option",
  error = "",
  definition = {
    id: "id",
    name: "name",
  },
}) => {
  return (
    <div>
      <select
        value={value}
        onChange={onChange}
        className="w-full p-3 mb-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
      >
        <option value="">{t(placeholder)}</option>
        {options.map((option) => (
          <option key={option[definition.id]} value={option[definition.id]}>
            {option[definition.name]}
          </option>
        ))}
      </select>
      <InputError error={error} />
    </div>
  );
};

export default SelectComponent;
