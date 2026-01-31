import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const CreateAboutForm = () => {
  const AxiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({
    heading: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.heading || !formData.content) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await AxiosSecure.post("/admin/create-about", formData);

      if (!res.data.success) {
        toast.error(res.data.message || "Failed to create content");
        return;
      }

      toast.success(res.data.message);
      setFormData({ heading: "", content: "" });
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto  rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-clash mb-6">Create About Section</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Heading */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Heading</label>
          <input
            type="text"
            name="heading"
            value={formData.heading}
            onChange={handleChange}
            placeholder="Enter heading"
            className="input input-bordered w-full"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write content here..."
            className="textarea textarea-bordered w-full min-h-[150px]"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="group w-full md:w-1/3 bg-[#F5B400] py-3 text-black font-semibold rounded-lg hover:bg-yellow-600 transition disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save Content"}
        </button>
      </form>
    </div>
  );
};

export default CreateAboutForm;
