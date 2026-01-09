import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const EditBase = () => {
  const { id } = useParams();
  const AxiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    productImage: "",
    links: [],
  });

  /* ================= FETCH BASE ================= */
  useEffect(() => {
    const fetchBase = async () => {
      try {
        const res = await AxiosSecure.get(`/admin/get-base/${id}`);
        const base = res.data.base;

        setFormData({
          title: base.title || "",
          price: base.price || "",
          description: base.description || "",
          productImage: base.productImage || "",
          links: Array.isArray(base.links) ? base.links : [],
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBase();
  }, [AxiosSecure, id]);

  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLinkChange = (index, field, value) => {
    const updatedLinks = [...formData.links];
    updatedLinks[index] = {
      ...updatedLinks[index],
      [field]: value,
    };
    setFormData((prev) => ({ ...prev, links: updatedLinks }));
  };

  const addLink = () => {
    setFormData((prev) => ({
      ...prev,
      links: [...prev.links, { label: "", url: "" }],
    }));
  };

  const removeLink = (index) => {
    setFormData((prev) => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index),
    }));
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await AxiosSecure.put(`/admin/update-base/${id}`, formData);
      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      } else {
        toast.success(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">Edit Base</h2>

      <img src={formData.productImage} alt="" />

      <form onSubmit={handleSubmit} className="space-y-5 mt-2">
        {/* Title */}
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Base title"
          className="input input-bordered w-full"
          required
        />

        {/* Price */}
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="input input-bordered w-full"
          required
        />

        {/* Image */}
        <input
          name="productImage"
          value={formData.productImage}
          onChange={handleChange}
          placeholder="Image URL"
          className="input input-bordered w-full"
        />

        {/* Description */}
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="textarea textarea-bordered w-full"
          rows={4}
        />

        {/* LINKS */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Links</h3>
            <button
              type="button"
              onClick={addLink}
              className="btn btn-sm btn-outline"
            >
              + Add Link
            </button>
          </div>

          <div className="space-y-3">
            {formData.links.map((link, index) => (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-5 gap-2 items-center"
              >
                <input
                  value={link.label}
                  onChange={(e) =>
                    handleLinkChange(index, "label", e.target.value)
                  }
                  placeholder="Label"
                  className="input input-bordered sm:col-span-2"
                />

                <input
                  value={link.url}
                  onChange={(e) =>
                    handleLinkChange(index, "url", e.target.value)
                  }
                  placeholder="URL"
                  className="input input-bordered sm:col-span-2"
                />

                <button
                  type="button"
                  onClick={() => removeLink(index)}
                  className="btn btn-sm btn-error"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={saving}
          className="btn btn-primary w-full"
        >
          {saving ? "Updating..." : "Update Base"}
        </button>
      </form>
    </div>
  );
};

export default EditBase;
