/* eslint-disable react/prop-types */
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaEye, FaEyeSlash, FaTimes, FaCheck } from "react-icons/fa";
import { useGetServicesQuery } from "../../../../redux/feature/selectMenu/select.apislice.js";
import InputField from "../../../../Components/Form/InputField.jsx";
import { useValidation } from "../../../../Components/utils/validation.js";
import InputError from "../../../../Components/Form/InputError.jsx";
import SelectComponent from "../../../../Components/Form/SelectComponent.jsx";

const AddManagerModal = ({
  show,
  onClose,
  managerData,
  setManagerData,
  onAdd,
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const { data: servicesData } = useGetServicesQuery({ only_unique: 1 });
  const services = servicesData?.data || [];
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const { getErrors } = useValidation();
  const errors = getErrors("addManager");

  if (!show) return null;

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setManagerData({
      ...managerData,
      user: { ...managerData.user, [name]: value },
    });
  };

  const iconPositionClass = isRTL ? "left-3" : "right-3";

  const renderPasswordIcon = (show, setShow) => (
    <button
      type="button"
      onClick={() => setShow((prev) => !prev)}
      className={`absolute top-1/2 -translate-y-1/2 ${iconPositionClass} text-gray-400`}
    >
      {show ? <FaEyeSlash /> : <FaEye />}
    </button>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {t("addManager.title")}
        </h2>

        <SelectComponent
          error={errors["service_id"]}
          options={services}
          value={managerData.service_id || ""}
          placeholder="addManager.selectService"
          onChange={(e) =>
            setManagerData({ ...managerData, service_id: e.target.value })
          }
        />
        <InputField
          type="text"
          name="name"
          value={managerData.user.name}
          onChange={handleUserChange}
          placeholder={t("addManager.name")}
          error={errors["user.name"]}
        />

        <InputField
          type="email"
          name="email"
          value={managerData.user.email}
          onChange={handleUserChange}
          placeholder={t("addManager.email")}
          error={errors["user.email"]}
        />

        <InputField
          type={showPassword ? "text" : "password"}
          name="password"
          value={managerData.user.password}
          onChange={handleUserChange}
          placeholder={t("addManager.password")}
          icon={renderPasswordIcon(showPassword, setShowPassword)}
          error={errors["user.password"]}
        />

        <InputField
          type={showPasswordConfirm ? "text" : "password"}
          name="password_confirmation"
          value={managerData.user.password_confirmation}
          onChange={handleUserChange}
          placeholder={t("addManager.passwordConfirmation")}
          error={errors["user.password"]}
          icon={renderPasswordIcon(showPasswordConfirm, setShowPasswordConfirm)}
        />

        <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <label className="flex items-start gap-3 cursor-pointer">
            <div className="relative flex items-center justify-center w-7 h-5 border-2 border-gray-300 rounded bg-white">
              <input
                type="checkbox"
                checked={managerData.automatic_assignment || false}
                onChange={(e) =>
                  setManagerData({
                    ...managerData,
                    automatic_assignment: e.target.checked,
                  })
                }
                className="sr-only peer"
              />
              {managerData.automatic_assignment && (
                <FaCheck className="w-4 h-4 text-blue-600" />
              )}
            </div>
            <div>
              <span className="font-medium text-gray-700">
                {t("addManager.automaticAssignment")}
              </span>
              <p className="text-sm text-gray-500 mt-1">
                {t("addManager.automaticAssignmentDesc")}
              </p>
            </div>
          </label>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            {t("addManager.cancel")}
          </button>
          <button
            onClick={onAdd}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {t("addManager.add")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddManagerModal;

