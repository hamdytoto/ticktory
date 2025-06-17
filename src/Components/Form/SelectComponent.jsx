/* eslint-disable react/prop-types */
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
  // New props for grouped options
  isGrouped = false,
  groupDefinition = {
    groupKey: "service",
    itemsKey: "sections",
    groupId: "id",
    groupName: "name",
  },
}) => {
  const renderRegularOptions = () => {
    return options.map((option) => (
      <option key={option[definition.id]} value={option[definition.id]}>
        {option[definition.name]}
      </option>
    ));
  };

  const renderGroupedOptions = () => {
    return options.map((group) => {
      const groupData = group[groupDefinition.groupKey];
      const items = group[groupDefinition.itemsKey];

      return (
        <optgroup
          key={groupData[groupDefinition.groupId]}
          label={groupData[groupDefinition.groupName]}
        >
          {items.map((item) => (
            <option key={item[definition.id]} value={item[definition.id]}>
              {item[definition.name]}
            </option>
          ))}
        </optgroup>
      );
    });
  };

  return (
    <div>
      <select
        value={value}
        onChange={onChange}
        className="w-full p-3 mb-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
      >
        <option value="">{t(placeholder)}</option>
        {isGrouped ? renderGroupedOptions() : renderRegularOptions()}
      </select>
      <InputError error={error} />
    </div>
  );
};

export default SelectComponent;