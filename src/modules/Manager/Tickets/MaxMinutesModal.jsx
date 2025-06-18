/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaTimes, FaClock } from "react-icons/fa";

const MaxMinutesModal = ({ isOpen, onClose, onSubmit, currentValue }) => {
  const { t } = useTranslation();
  const [minutes, setMinutes] = useState(currentValue);

  useEffect(() => {
    setMinutes(currentValue);
  }, [currentValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(minutes);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
        >
          <FaTimes />
        </button>

        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <FaClock className="text-blue-600" />
          {t("tickets.maxMinutes.title")}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("tickets.maxMinutes.label")}
            </label>
            <input
              type="number"
              min="1"
              value={minutes}
              onChange={(e) =>
                setMinutes(Math.max(1, parseInt(e.target.value) || 1))
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder={t("tickets.maxMinutes.placeholder")}
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              {t("common.cancel")}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
            >
              <FaClock className="text-sm" />
              {t("common.save")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MaxMinutesModal;

