/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";

export default function EditProfileModal({ isOpen, onClose, onSubmit, register, errors, handleAvatarChange, avatarPreview, isSubmitting }) {
    const { t } = useTranslation();

    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50  bg-opacity-30 backdrop-blur-sm flex justify-center items-center p-4">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">{t("profilePage.editProfile", "Edit Profile")}</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-red-500">
              ✕
            </button>
          </div>
  
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Avatar */}
            <div className="flex justify-center">
              <label className="relative cursor-pointer">
                {avatarPreview ? (
                  <img src={avatarPreview} alt={t("profilePage.avatarAlt", "Avatar")} className="w-24 h-24 rounded-full object-cover" />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-100 flex justify-center items-center text-3xl text-gray-400">👤</div>
                )}
                <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
              </label>
            </div>
  
            {/* Name */}
            <div>
              <label className="block text-sm font-medium">{t("profilePage.fullName", "Full Name")}</label>
              <input {...register("name")} className="input-style" />
              {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
            </div>
  
            {/* Email */}
            <div>
              <label className="block text-sm font-medium">{t("profilePage.email", "Email")}</label>
              <input {...register("email")} type="email" className="input-style" />
              {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
            </div>
  
            {/* Phone */}
            <div>
              <label className="block text-sm font-medium">{t("profilePage.phone", "Phone")}</label>
              <input {...register("phone")} className="input-style" />
              {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
            </div>
  
            <button type="submit" disabled={isSubmitting} className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
              {isSubmitting ? t("profilePage.updating", "Updating...") : t("profilePage.saveChanges", "Save Changes")}
            </button>
          </form>
        </div>
      </div>
    );
}
