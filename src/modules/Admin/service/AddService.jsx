/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";
import { useValidation } from "../../../Components/utils/validation";
import InputField from "../../../Components/Form/InputField";

const AddServiceModal = ({
  show,
  onClose,
  serviceName,
  setServiceName,
  onAdd,
}) => {
  const { t } = useTranslation();
  const errors = useValidation().getErrors("addService");
  if (!show) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
          onClick={onClose}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {t("service.add_title")}
        </h2>
        <InputField
          type="text"
          placeholder={t("service.name_placeholder")}
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg w-full mb-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          error={errors["name"]}
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 transition"
          >
            {t("common.cancel")}
          </button>
          <button
            onClick={onAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            {t("common.add")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddServiceModal;

