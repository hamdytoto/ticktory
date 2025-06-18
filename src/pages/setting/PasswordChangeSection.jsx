/* eslint-disable react/prop-types */
import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { FaSave, FaKey } from "react-icons/fa";
import { toast } from "react-toastify";
import { useChangePasswordMutation } from "../../redux/feature/auth/authApiSlice";
import PasswordInput from "../../Components/Form/PasswordInput";
import {
  useApiCallback,
  useValidation,
} from "../../Components/utils/validation";

const PasswordChangeSection = ({ isRTL }) => {
  const { t } = useTranslation();
  const [updatePassword] = useChangePasswordMutation();
  const { handleApiCallback } = useApiCallback();
  const validationErrors = useValidation().getErrors("changePassword");

  // Password states
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Password visibility states
  const [passwordVisibility, setPasswordVisibility] = useState({
    showCurrentPassword: false,
    showNewPassword: false,
    showConfirmPassword: false,
  });

  // Helper for icon position based on language direction
  const iconPositionClass = isRTL ? "left-3 right-auto" : "right-3 left-auto";

  // Handle password form changes
  const handlePasswordFormChange = useCallback((field, value) => {
    setPasswordForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  // Handle password visibility changes
  const handlePasswordVisibilityChange = useCallback((field, value) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  // Password validation
  const validatePasswords = useCallback(() => {
    const { currentPassword, newPassword, confirmPassword } = passwordForm;

    if (!currentPassword.trim()) {
      toast.error(t("settings.errors.currentPasswordRequired"));
      return false;
    }

    if (!newPassword.trim()) {
      toast.error(t("settings.errors.newPasswordRequired"));
      return false;
    }

    if (newPassword.length < 8) {
      toast.error(t("settings.errors.passwordTooShort"));
      return false;
    }

    if (newPassword === currentPassword) {
      toast.error(t("settings.errors.samePassword"));
      return false;
    }

    if (newPassword !== confirmPassword) {
      toast.error(t("settings.errors.passwordMismatch"));
      return false;
    }

    return true;
  }, [passwordForm, t]);

  // Handle password API errors
  const handlePasswordError = (error) => {
    if (error.data?.old_password) {
      toast.error(t("settings.errors.incorrectCurrentPassword"));
    } else if (error.data?.new_password) {
      toast.error(t("settings.errors.invalidNewPassword"));
    } else {
      toast.error(t("settings.errors.updateFailed"));
    }
    console.error("Password update error:", error);
  };

  // Handle password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (!validatePasswords()) {
      return;
    }

    await handleApiCallback(async () => {
      const { currentPassword, newPassword, confirmPassword } = passwordForm;

      await updatePassword({
        old_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: confirmPassword,
      }).unwrap();

      // Reset form on success
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setPasswordVisibility({
        showCurrentPassword: false,
        showNewPassword: false,
        showConfirmPassword: false,
      });

      toast.success(t("settings.passwordUpdateSuccess"));
    }, "changepassword");
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 transition-all hover:shadow-lg">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <FaKey className="text-blue-600" />
        {t("settings.passwordSection")}
      </h2>

      <form onSubmit={handlePasswordChange} className="space-y-6">
        <PasswordInput
          label={t("settings.currentPassword")}
          value={passwordForm.currentPassword}
          error={validationErrors.old_password}
          onChange={(e) =>
            handlePasswordFormChange("currentPassword", e.target.value)
          }
          showPassword={passwordVisibility.showCurrentPassword}
          setShowPassword={(value) =>
            handlePasswordVisibilityChange("showCurrentPassword", value)
          }
          iconPositionClass={iconPositionClass}
          placeholder={t("settings.enterCurrentPassword")}
        />

        <PasswordInput
          label={t("settings.newPassword")}
          value={passwordForm.newPassword}
          onChange={(e) =>
            handlePasswordFormChange("newPassword", e.target.value)
          }
          showPassword={passwordVisibility.showNewPassword}
          setShowPassword={(value) =>
            handlePasswordVisibilityChange("showNewPassword", value)
          }
          error={validationErrors.new_password}
          iconPositionClass={iconPositionClass}
          placeholder={t("settings.enterNewPassword")}
        />

        <PasswordInput
          label={t("settings.confirmPassword")}
          value={passwordForm.confirmPassword}
          onChange={(e) =>
            handlePasswordFormChange("confirmPassword", e.target.value)
          }
          showPassword={passwordVisibility.showConfirmPassword}
          setShowPassword={(value) =>
            handlePasswordVisibilityChange("showConfirmPassword", value)
          }
          error={validationErrors.new_password}
          iconPositionClass={iconPositionClass}
          placeholder={t("settings.confirmNewPassword")}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 
                             transition-all flex items-center justify-center gap-2 
                             focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={
            !passwordForm.currentPassword ||
            !passwordForm.newPassword ||
            !passwordForm.confirmPassword
          }
        >
          <FaSave />
          {t("settings.updatePassword")}
        </button>
      </form>
    </div>
  );
};

export default PasswordChangeSection;

