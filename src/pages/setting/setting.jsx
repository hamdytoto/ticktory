import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import { useShowSettingsQuery } from '../../redux/feature/Manager/settings/manager.setting.apiSlice';
import { useUser } from '../../context/userContext';
import getUserRole from '../../context/userType';
import PasswordChangeSection from './PasswordChangeSection';
import ManagerPreferencesSection from './ManagerPreferencesSection';
import SettingsLoadingSkeleton from './SettingsLoadingSkeleton';

const Settings = () => {
    const { t, i18n } = useTranslation();
    const { user } = useUser();
    const userRole = getUserRole(user.type);
    const isManager = userRole === 'manager';
    const isRTL = i18n.dir() === 'rtl';

    // Fetch manager settings only if user is a manager
    const {
        data: managerSettings,
        isLoading: isLoadingSettings,
        error: settingsError
    } = useShowSettingsQuery(undefined, {
        skip: !isManager
    });

    // Manager settings state
    const [autoAssign, setAutoAssign] = useState(null);

    // Initialize auto-assign setting from API
    useEffect(() => {
        if (isManager && managerSettings?.data?.automatic_assignment !== undefined) {
            setAutoAssign(managerSettings.data.automatic_assignment);
        }
    }, [isManager, managerSettings]);

    // Loading state for settings
    if (isManager && isLoadingSettings) {
        return <SettingsLoadingSkeleton />;
    }

    return (
        <div className="mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8">{t('settings.title')}</h1>

            <PasswordChangeSection isRTL={isRTL} />

            {isManager && (
                <ManagerPreferencesSection
                    autoAssign={autoAssign}
                    setAutoAssign={setAutoAssign}
                    settingsError={settingsError}
                    isLoadingSettings={isLoadingSettings}
                />
            )}

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={isRTL}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default Settings;