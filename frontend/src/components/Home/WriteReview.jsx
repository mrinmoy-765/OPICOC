import * as React from "react";
import { useState } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import IconButton from "@mui/material/IconButton";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuth } from "../../AuthProvider/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

const WriteReview = () => {
  const { user } = useAuth();
  const AxiosSecure = useAxiosSecure();

  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const [rating, setRating] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const [preview, setPreview] = React.useState("");

  const onSubmit = async (data) => {
    if (!rating) {
      toast.error("Please select a rating");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("review", data.review);
      formData.append("rating", rating);
      formData.append("userId", user._id);
      formData.append("FirstName", user.FirstName);
      formData.append("LastName", user.LastName);
      formData.append("email", user.email);
      formData.append("userImage", user.image || "");

      if (data.reviewImage?.[0]) {
        formData.append("reviewImage", data.reviewImage[0]);
      }

      const res = await AxiosSecure.post("/review/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Assuming 'formElement' is a reference to your HTML form

      // const plainObject = Object.fromEntries(formData.entries());

      // console.log("Object", plainObject);
      // You can then stringify it for sending as JSON if needed
      // console.log(JSON.stringify(plainObject));

      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }

      toast.success("Review submitted successfully!");
      reset();
      setPreview("");
      setRating(2);
    } catch (error) {
      toast.error(error.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-5 md:p-10 rounded-lg max-w-3xl mx-auto">
      <h1 className="text-3xl font-clash mb-4">Write a review</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#FADD8A] rounded-lg p-5 flex flex-col gap-5"
      >
        {/* Review text */}
        <textarea
          placeholder="Share your experience"
          {...register("review", { required: true })}
          className="w-full h-32 bg-transparent border-none focus:ring-0 resize-none text-black placeholder:text-black/50"
        />

        {/* Rating + Image + Submit */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Rating */}
          <div>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Rating
                value={rating}
                precision={0.5}
                onChange={(e, newValue) => setRating(newValue)}
                onChangeActive={(e, newHover) => setHover(newHover)}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : rating]}</Box>
            </Box>
          </div>
          {/* Image upload icon */}
          <div className="flex gap-1">
            <div className="flex items-center">
              <input
                type="file"
                accept="image/*"
                {...register("reviewImage", {
                  onChange: (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setPreview(URL.createObjectURL(file));
                    }
                  },
                })}
                id="review-image"
                hidden
              />
              <label htmlFor="review-image">
                <IconButton component="span">
                  <PhotoCamera />
                </IconButton>
              </label>

              {preview && (
                <img
                  src={preview}
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
                {loading ? "Submitting" : "Submit"}
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default WriteReview;
