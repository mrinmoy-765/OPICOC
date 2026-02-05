import * as React from "react";
import { useState } from "react";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import IconButton from "@mui/material/IconButton";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useAuth } from "../AuthProvider/AuthContext";

const CustomBaseForm = () => {
  const { user } = useAuth();
  const AxiosSecure = useAxiosPublic();

  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = React.useState("");

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("request", data.request);
      formData.append("userId", user._id);
      formData.append("FirstName", user.FirstName);
      formData.append("LastName", user.LastName);
      formData.append("email", user.email);
      formData.append("userImage", user.image || "");

      if (data.requestImage?.[0]) {
        formData.append("requestImage", data.requestImage[0]);
      }

      const res = await AxiosSecure.post("/request/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }

      toast.success("Request submitted successfully!");
      reset();
      setPreview("");
    } catch (error) {
      toast.error(error.message || "Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-5 md:p-10 rounded-lg max-w-3xl mx-auto">
      <h1 className="text-2xl font-clash mb-4 text-gray-500">
        Request a custom base
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#FADD8A] rounded-lg p-5 flex flex-col gap-5"
      >
        {/* Request text */}
        <textarea
          placeholder="Describe what kind of base you want (You can also add an image of your desired base)"
          {...register("request", { required: true })}
          className="w-full h-32 bg-transparent border-none focus:ring-0 resize-none text-black placeholder:text-black/50"
        />

        {/* Image + Submit */}
        <div className="flex flex-col md:flex-row items-center justify-end gap-6">
          {/* Image upload icon */}
          <div className="flex gap-1">
            <div className="flex items-center">
              <input
                type="file"
                accept="image/*"
                {...register("requestImage", {
                  onChange: (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setPreview(URL.createObjectURL(file));
                    }
                  },
                })}
                id="request-image"
                hidden
              />
              <label htmlFor="request-image">
                <IconButton component="span">
                  <PhotoCamera />
                </IconButton>
              </label>

              {preview && (
                <img
                  src={preview}
                  loading="lazy"
                  alt="preview"
                  className="w-12 h-12 rounded object-cover border"
                />
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="group w-full md:w-auto px-8 py-3 bg-[#F5B400] text-black font-semibold rounded-lg hover:bg-yellow-600 transition"
            >
              <span className="inline-block group-hover:translate-x-2 transition duration-300">
                {loading ? "Sending" : "Send"}
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CustomBaseForm;
