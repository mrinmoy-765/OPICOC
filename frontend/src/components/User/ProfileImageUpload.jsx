import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ProfileImageUpload = ({ refetch, setPreview }) => {
  const { register, handleSubmit, reset } = useForm();
  const AxiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    try {
      const file = data.image[0];

      const formData = new FormData();
      formData.append("image", file);

      const res = await AxiosSecure.post(
        "/user/upload-profile-image",
        formData
      );

      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }

      toast.success("Profile image updated");
      reset();
      refetch();
      setPreview(null); // clear preview after upload
    } catch (error) {
      toast.error(error.message || "Upload failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <input
        type="file"
        accept="image/*"
        {...register("image", { required: true })}
        onChange={(e) => setPreview(URL.createObjectURL(e.target.files[0]))}
        className="file-input file-input-warning file-input-xs"
      />

      <button type="submit" className="btn btn-warning btn-xs w-full mb-5">
        Upload
      </button>
    </form>
  );
};

export default ProfileImageUpload;
