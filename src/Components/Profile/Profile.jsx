import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../redux/feature/auth/authApiSlice";

import LoadingSpinner from "../../common/Loadingspinner";
import ErrorAlert from "../../common/ErrorAlert";
import ProfileCard from "./components/profileCard";
import EditProfileModal from "./components/EditProfileModal";
import { useApiCallback } from "../utils/validation";

export default function ProfileUpdate() {
  const { t } = useTranslation();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const { handleApiCallback } = useApiCallback();

  const schema = z.object({
    name: z.string().min(2, t("profilePage.nameMin")),
    email: z.string().email(t("profilePage.emailValid")),
    phone: z.string().min(11, t("profilePage.phoneMin")),
  });

  const { data: response, isLoading, isError, refetch } = useGetProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const profile = response?.data;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (profile) {
      reset({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
      });
      if (profile.avatar) setAvatarPreview(profile.avatar);
    }
  }, [profile, reset]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error(t("profilePage.invalidImage"));
        return;
      }
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    if (avatar && !(avatar instanceof File)) {
      toast.error(t("profilePage.invalidAvatarFile"));
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);

    if (avatar) {
      formData.append("avatar", avatar);
    }

    await handleApiCallback(async () => {
      await updateProfile(formData).unwrap();
      toast.success(t("profilePage.updateSuccess"));
      await refetch();
      setIsEditModalOpen(false);
    }, "profile");
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorAlert message={t("profilePage.loadFail")} />;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <ProfileCard
        profile={profile}
        onEditClick={() => setIsEditModalOpen(true)}
        avatarPreview={avatarPreview}
      />

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
        avatarPreview={avatarPreview}
        handleAvatarChange={handleAvatarChange}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
