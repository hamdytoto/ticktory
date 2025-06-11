import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FaSave, FaKey, FaBell } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import { useChangePasswordMutation } from '../../redux/feature/auth/authApiSlice';
import PasswordInput from '../../Components/Form/PasswordInput';
import ToggleSwitch from '../../Components/Form/ToggleSwitch';
import { useUser } from '../../context/userContext';
import getUserRole from '../../context/userType';
const Settings = () => {
    const { t, i18n } = useTranslation();
    const { user } = useUser();
    const userRole = getUserRole(user.type);
    const isManager = userRole === 'manager' 
    const isRTL = i18n.dir() === 'rtl';
    const [updatePassword] = useChangePasswordMutation();
    // Password states
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Password visibility states
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Theme preference state
    // const [isDarkMode, setIsDarkMode] = useState(false);

    // Notification preferences
    // const [emailNotifications, setEmailNotifications] = useState(true);

    // Add automatic assignment state
    const [autoAssign, setAutoAssign] = useState(false);

    // Helper for icon position based on language direction
    const iconPositionClass = isRTL ? "left-3 right-auto" : "right-3 left-auto";

    const validatePasswords = useCallback(() => {
        if (!currentPassword.trim()) {
            toast.error(t('settings.errors.currentPasswordRequired'));
            return false;
        }

        if (!newPassword.trim()) {
            toast.error(t('settings.errors.newPasswordRequired'));
            return false;
        }

        if (newPassword.length < 8) {
            toast.error(t('settings.errors.passwordTooShort'));
            return false;
        }

        if (newPassword === currentPassword) {
            toast.error(t('settings.errors.samePassword'));
            return false;
        }

        if (newPassword !== confirmPassword) {
            toast.error(t('settings.errors.passwordMismatch'));
            return false;
        }

        return true;
    }, [currentPassword, newPassword, confirmPassword, t]);

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (!validatePasswords()) {
            return;
        }

        try {
            await updatePassword({
                old_password: currentPassword,
                new_password: newPassword,
                new_password_confirmation: confirmPassword
            }).unwrap();

            // Clear form on success
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setShowCurrentPassword(false);
            setShowNewPassword(false);
            setShowConfirmPassword(false);

            toast.success(t('settings.passwordUpdateSuccess'));
        } catch (error) {
            // Handle specific API errors
            if (error.data?.old_password) {
                toast.error(t('settings.errors.incorrectCurrentPassword'));
            } else if (error.data?.new_password) {
                toast.error(t('settings.errors.invalidNewPassword'));
            } else {
                toast.error(t('settings.errors.updateFailed'));
            }
            console.error('Password update error:', error);
        }
    };

    return (
        <div className="mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8">{t('settings.title')}</h1>

            {/* Password Change Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 transition-all hover:shadow-lg">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <FaKey className="text-blue-600" />
                    {t('settings.passwordSection')}
                </h2>
                <form onSubmit={handlePasswordChange} className="space-y-6">
                    <PasswordInput
                        label={t('settings.currentPassword')}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        showPassword={showCurrentPassword}
                        setShowPassword={setShowCurrentPassword}
                        iconPositionClass={iconPositionClass}
                        placeholder={t('settings.enterCurrentPassword')}
                    />
                    <PasswordInput
                        label={t('settings.newPassword')}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        showPassword={showNewPassword}
                        setShowPassword={setShowNewPassword}
                        iconPositionClass={iconPositionClass}
                        placeholder={t('settings.enterNewPassword')}
                    />
                    <PasswordInput
                        label={t('settings.confirmPassword')}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        showPassword={showConfirmPassword}
                        setShowPassword={setShowConfirmPassword}
                        iconPositionClass={iconPositionClass}
                        placeholder={t('settings.confirmNewPassword')}
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 
                                 transition-all flex items-center justify-center gap-2 
                                 focus:ring-4 focus:ring-blue-300"
                    >
                        <FaSave />
                        {t('settings.updatePassword')}
                    </button>
                </form>
            </div>

            {/* Preferences Section */}
            <div className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
                <h2 className="text-xl font-semibold mb-6">{t('settings.preferences')}</h2>

                <div className="space-y-2">
                    {isManager && (
                        <ToggleSwitch
                            label={t('settings.autoAssign')}
                            checked={autoAssign}
                            onChange={() => setAutoAssign(!autoAssign)}
                            icon={<FaBell className="text-gray-600" />}
                        />
                    )}
                    {/* Uncomment if you want to add dark mode and email notifications later */}
                    {/* <ToggleSwitch
                        label={t('settings.darkMode')}
                        checked={isDarkMode}
                        onChange={() => setIsDarkMode(!isDarkMode)}
                        icon={<FaMoon className="text-gray-600" />}
                    />
                    <ToggleSwitch
                        label={t('settings.emailNotifications')}
                        checked={emailNotifications}
                        onChange={() => setEmailNotifications(!emailNotifications)}
                        icon={<FaBell className="text-gray-600" />}
                    /> */}
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default Settings;