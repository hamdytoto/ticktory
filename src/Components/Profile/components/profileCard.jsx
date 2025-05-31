/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";
import getUserRole from "../../../context/userType";

export default function ProfileCard({ profile, onEditClick, avatarPreview }) {
  const { t, i18n } = useTranslation();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex items-center space-x-4">
            <div className="relative">
              {avatarPreview ? (
                <img src={avatarPreview} alt={t("profilePage.avatarAlt", "Avatar")} className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-md" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center border-4 border-white shadow-md">
                  <span className="text-2xl text-indigo-500">👤</span>
                </div>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{profile.name}</h1>
              <p className="text-sm text-gray-500">
                {t("profilePage.memberSince", {
                  date: new Date(profile.created_at).toLocaleDateString(i18n.language)
                })}
              </p>
            </div>
          </div>
          <button
            onClick={onEditClick}
            className="mt-4 md:mt-0 flex items-center space-x-2 bg-white hover:bg-gray-50 text-gray-800 font-medium px-4 py-2.5 rounded-lg border border-gray-200 shadow-sm"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="" />
            </svg>
            <span>{t("profilePage.editProfile", "Edit Profile")}</span>
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Personal Info */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase">{t("profilePage.personalInfo", "Personal Information")}</h3>
          <div className="mt-4 space-y-4">
            <p className="text-sm text-gray-500">{t("profilePage.fullName", "Full Name")}</p>
            <p className="text-gray-900 font-medium">{profile.name}</p>
            <p className="text-sm text-gray-500">{t("profilePage.email", "Email")}</p>
            <p className="text-gray-900 font-medium">{profile.email}</p>
            <p className="text-sm text-gray-500">{t("profilePage.phone", "Phone")}</p>
            <p className="text-gray-900 font-medium">{profile.phone}</p>
          </div>
        </div>
        {/* Account Info */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase">{t("profilePage.accountStatus", "Account Status")}</h3>
          <div className="mt-4 space-y-4">
            <p className="text-sm text-gray-500">{t("profilePage.accountType", "Account Type")}</p>
            <p className="text-gray-900 font-medium">{getUserRole(profile.type)}</p>
            <p className="text-sm text-gray-500">{t("profilePage.status", "Status")}</p>
            <p className="text-gray-900 font-medium">
              {profile.status ? t("profilePage.active", "Active") : t("profilePage.inactive", "Inactive")}
            </p>
            <p className="text-sm text-gray-500">{t("profilePage.lastLogin", "Last Login")}</p>
            <p className="text-gray-900 font-medium">{new Date(profile.last_login_time).toLocaleString(i18n.language)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
