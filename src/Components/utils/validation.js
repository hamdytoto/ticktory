import { t } from "i18next";
import { toast } from "react-toastify";
import { create } from "zustand";

export const useValidationStore = create((set, get) => ({
  validation: {},
  setValidation: (key, errors) => {
    set((state) => ({
      validation: {
        ...state.validation,
        [key.toLowerCase()]: errors,
      },
    }));
  },

  getValidation: (key) => {
    if (!key) {
      console.error(`validation key: ${key} is required`);
    }
    return get().validation[key.toLowerCase()] || {};
  },

  resetValidation: () => {
    set({ validation: {} });
  },
}));

export const useValidation = () => {
  const setValidation = useValidationStore((state) => state.setValidation);
  const getValidation = useValidationStore((state) => state.getValidation);
  const resetValidation = useValidationStore((state) => state.resetValidation);

  const getErrors = (key) => {
    return getValidation(key);
  };
  return { setValidation, getErrors, resetValidation };
};

export const useApiCallback = () => {
  const setValidation = useValidationStore((state) => state.setValidation);

  const handleApiCallback = async (
    callback,
    errorsMappedKey = "addManager",
  ) => {
    try {
      await callback();
      setValidation(errorsMappedKey, {});
    } catch (error) {
      if (error?.data.code === 422) {
        setValidation(errorsMappedKey, error.data.data);

        // const firstKey = Object.keys(error.data.data)[0];
        // toast.error(`${t(firstKey)}: ${error.data.data[firstKey]}`);

        return;
      }
      toast.error(error.data.message);
    }
  };

  return { handleApiCallback };
};
