/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaSave, FaTimes, FaEye, FaEyeSlash, FaCheck } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useGetServicesQuery } from "../../../../redux/feature/selectMenu/select.apislice";
import InputField from "../../../../Components/Form/InputField";
const EditManagerModal = ({ show, onClose, managerData, setManagerData, onSave }) => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir() === "rtl";
    const { data: servicesData } = useGetServicesQuery({ only_unique: 1 });
    const services = servicesData?.data || [];

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    if (!show || !managerData || !managerData.user) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (["name", "email", "password", "password_confirmation"].includes(name)) {
            setManagerData({
                ...managerData,
                user: { ...managerData.user, [name]: value },
            });
        } else {
            setManagerData({ ...managerData, [name]: value });
        }
    };

    const iconPositionClass = isRTL ? "left-3" : "right-3";

    const renderPasswordIcon = (show, setShow) => (
        <button
            type="button"
            onClick={() => setShow(prev => !prev)}
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
                    {t("editManager.title")}
                </h2>

                <select
                    value={managerData.service_id || ""}
                    onChange={handleChange}
                    name="service_id"
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                    <option value="">{t("editManager.selectService")}</option>
                    {services.map(service => (
                        <option key={service.id} value={service.id}>{service.name}</option>
                    ))}
                </select>

                <InputField
                    type="text"
                    name="name"
                    value={managerData.user.name}
                    onChange={handleChange}
                    placeholder={t("editManager.name")}
                />

                <InputField
                    type="email"
                    name="email"
                    value={managerData.user.email}
                    onChange={handleChange}
                    placeholder={t("editManager.email")}
                />

                <InputField
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={managerData.user.password}
                    onChange={handleChange}
                    placeholder={t("editManager.password")}
                    icon={renderPasswordIcon(showPassword, setShowPassword)}
                />

                <InputField
                    type={showPasswordConfirm ? "text" : "password"}
                    name="password_confirmation"
                    value={managerData.user.password_confirmation}
                    onChange={handleChange}
                    placeholder={t("editManager.passwordConfirmation")}
                    icon={renderPasswordIcon(showPasswordConfirm, setShowPasswordConfirm)}
                />

                <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <label className="flex items-start gap-3 cursor-pointer">
                        <div className="relative flex items-center justify-center w-8 h-5 border-2 border-gray-300 rounded bg-white">
                            <input
                                type="checkbox"
                                checked={managerData.automatic_assignment || false}
                                onChange={(e) => setManagerData({
                                    ...managerData,
                                    automatic_assignment: e.target.checked
                                })}
                                className="sr-only peer "
                            />
                            {managerData.automatic_assignment && (
                                <FaCheck className="w-4 h-4 text-blue-600" />
                            )}
                        </div>
                        <div>
                            <span className="font-medium text-gray-700">
                                {t("editManager.automaticAssignment")}
                            </span>
                            <p className="text-sm text-gray-500 mt-1">
                                {t("editManager.automaticAssignmentDesc")}
                            </p>
                        </div>
                    </label>
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 flex items-center gap-2"
                    >
                        <FaTimes className="text-sm" />
                        {t("editManager.cancel")}
                    </button>
                    <button
                        onClick={onSave}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
                    >
                        <FaSave className="text-sm" />
                        {t("editManager.save")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditManagerModal;
