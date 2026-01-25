import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";

const EditAbout = () => {
  const { id } = useParams(); // about id
  const navigate = useNavigate();
  const AxiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({
    heading: "",
    content: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // fetch existing about data
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await AxiosSecure.get(`/admin/get-about/${id}`);
        setFormData({
          heading: res.data.about.heading,
          content: res.data.about.content,
        });
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, [AxiosSecure, id]);

  // input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.heading || !formData.content) {
      toast.error("All fields are required");
      return;
    }

    try {
      setSaving(true);

      const res = await AxiosSecure.put(`/admin/update-about/${id}`, formData);

      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
      navigate("/about-list");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Spinner></Spinner>;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      <h1 className="text-3xl font-clash font-bold mb-6">Edit About Section</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-base-100 shadow-md rounded-lg p-6 space-y-5"
      >
        {/* heading */}
        <div>
          <label className="label">
            <span className="label-text font-semibold">Heading</span>
          </label>
          <input
            type="text"
            name="heading"
            value={formData.heading}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Enter heading"
          />
        </div>

        {/* content */}
        <div>
          <label className="label">
            <span className="label-text font-semibold">Content</span>
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="textarea textarea-bordered w-full min-h-[150px]"
            placeholder="Enter content"
          />
        </div>

        {/* actions */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn btn-outline"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="btn bg-blue-500 text-white hover:bg-blue-600"
          >
            {saving ? "Saving..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAbout;
