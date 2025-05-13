import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../redux/feature/auth/authApiSlice";

import LoadingSpinner from "../../common/Loadingspinner";
import ErrorAlert from "../../common/ErrorAlert";
import ProfileCard from "./components/profileCard";
import EditProfileModal from "./components/EditProfileModal";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(11, "Phone must be at least 11 digits"),
});

export default function ProfileUpdate() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

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
        toast.error("Please upload a valid image file.");
        return;
      }
      // Set the selected avatar file and its preview
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    // Check that avatar is a valid file object
    if (avatar && !(avatar instanceof File)) {
      toast.error("Invalid avatar file.");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);

    if (avatar) {
      formData.append("avatar", avatar); // Attach the avatar file if selected
    }

    // Log the form data for debugging purposes
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      const result = await updateProfile(formData).unwrap();
      console.log(result);
      toast.success("Profile updated successfully!");
      await refetch(); // Refetch the profile data after update
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorAlert message="Failed to load profile data." />;

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
