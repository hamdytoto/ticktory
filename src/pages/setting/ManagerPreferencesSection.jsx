/* eslint-disable react/prop-types */
import { useTranslation } from 'react-i18next';
import { FaCog, FaRandom, FaExclamationCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useUpdateSettingsMutation } from '../../redux/feature/Manager/settings/manager.setting.apiSlice';
import ToggleSwitch from '../../Components/Form/ToggleSwitch';

const ManagerPreferencesSection = ({
    autoAssign,
    setAutoAssign,
    settingsError,
    isLoadingSettings
}) => {
    const { t } = useTranslation();
    const [updateSettings] = useUpdateSettingsMutation();

    // Handle auto-assign toggle
    const handleAutoAssignToggle = async () => {
        const newValue = !autoAssign;

        try {
            await updateSettings({
                automatic_assignment: newValue
            }).unwrap();

            setAutoAssign(newValue);
            toast.success(t('settings.autoAssignUpdateSuccess'));
        } catch (error) {
            toast.error(t('settings.errors.autoAssignUpdateFailed'));
            console.error('Auto-assign update error:', error);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <FaCog className="text-blue-600" />
                {t('settings.preferences')}
            </h2>

            <div className="space-y-4">
                <ToggleSwitch
                    label={t('settings.autoAssign')}
                    checked={!!autoAssign}
                    onChange={handleAutoAssignToggle}
                    icon={<FaRandom className="text-gray-600" />}
                    disabled={isLoadingSettings}
                />

                {settingsError && (
                    <div className="text-red-600 text-sm mt-2 flex items-center gap-2">
                        <FaExclamationCircle />
                        {t('settings.errors.settingsLoadFailed')}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManagerPreferencesSection;