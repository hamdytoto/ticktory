import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaEye, FaEyeSlash, FaSave } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useChangePasswordMutation } from '../../redux/feature/auth/authApiSlice';

const Settings = () => {
    const { t, i18n } = useTranslation();
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
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Notification preferences
    const [emailNotifications, setEmailNotifications] = useState(true);

    // Helper for icon position based on language direction
    const iconPositionClass = isRTL ? "left-3 right-auto" : "right-3 left-auto";

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error(t('settings.passwordMismatch'));
            return;
        }

        try {
            await updatePassword({
                current_password: currentPassword,
                password: newPassword,
                password_confirmation: confirmPassword
            }).unwrap();

            toast.success(t('settings.passwordUpdateSuccess'));
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            toast.error(t('settings.passwordUpdateError'));
            console.error('Error updating password:', error);
        }
    };

    return (
        <div className=" p-6">
            <h1 className="text-3xl font-bold mb-8">{t('settings.title')}</h1>

            {/* Password Change Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">{t('settings.passwordSection')}</h2>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                    {/* Current Password */}
                    <div className="relative">
                        <label className="block text-sm font-medium mb-2">
                            {t('settings.currentPassword')}
                        </label>
                        <input
                            type={showCurrentPassword ? "text" : "password"}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full p-3 border rounded-lg"
                        />
                        <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className={`absolute top-[38px] transform -translate-y-1/2 text-gray-400 ${iconPositionClass}`}
                        >
                            {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    {/* New Password */}
                    <div className="relative">
                        <label className="block text-sm font-medium mb-2">
                            {t('settings.newPassword')}
                        </label>
                        <input
                            type={showNewPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full p-3 border rounded-lg"
                        />
                        <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className={`absolute top-[38px] transform -translate-y-1/2 text-gray-400 ${iconPositionClass}`}
                        >
                            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                        <label className="block text-sm font-medium mb-2">
                            {t('settings.confirmPassword')}
                        </label>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-3 border rounded-lg"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className={`absolute top-[38px] transform -translate-y-1/2 text-gray-400 ${iconPositionClass}`}
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                    >
                        <FaSave />
                        {t('settings.updatePassword')}
                    </button>
                </form>
            </div>

            {/* Preferences Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">{t('settings.preferences')}</h2>

                {/* Theme Toggle */}
                <div className="flex items-center justify-between py-3">
                    <span className="text-sm font-medium">{t('settings.darkMode')}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={isDarkMode}
                            onChange={() => setIsDarkMode(!isDarkMode)}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>

                {/* Email Notifications */}
                <div className="flex items-center justify-between py-3 border-t">
                    <span className="text-sm font-medium">{t('settings.emailNotifications')}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={emailNotifications}
                            onChange={() => setEmailNotifications(!emailNotifications)}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Settings;