import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useAuth } from "../../AuthProvider/AuthContext";
import { CiEdit } from "react-icons/ci";

const EditBase = () => {
  const { id } = useParams();
  const AxiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newImageFile, setNewImageFile] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    maxSell: "",
    seasonStartDate: "",
    seasonEndDate: "",
    links: [],
  });

  /* ================= FETCH BASE ================= */
  const fetchBase = async () => {
    try {
      setLoading(true);
      const res = await AxiosSecure.get(`/admin/get-base/${id}`);
      const base = res.data.base;

      setFormData({
        title: base.title || "",
        price:
          base.price !== undefined && base.price !== null
            ? String(base.price)
            : "",
        description: base.description || "",
        productImage: base.productImage || "",
        createdBy: base.createdBy || "",
        createdAt: base.createdAt || "",
        updatedAt: base.updatedAt || "",
        updatedBy: base.updatedBy || "",
        maxSell:
          base.maxSell !== undefined && base.maxSell !== null
            ? String(base.maxSell)
            : "",
        seasonStartDate: base.seasonStartDate || "",
        seasonEndDate: base.seasonEndDate || "",
        links: Array.isArray(base.links) ? base.links : [],
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBase();
  }, [AxiosSecure, id]);

  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImageFile(file);
    }
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
      const formDataToSend = new FormData();

      // Add all regular fields
      formDataToSend.append("title", formData.title);
      formDataToSend.append(
        "price",
        formData.price === "" ? 0 : parseFloat(formData.price),
      );
      formDataToSend.append("description", formData.description);
      formDataToSend.append(
        "maxSell",
        formData.maxSell === "" ? 0 : parseFloat(formData.maxSell),
      );
      formDataToSend.append("seasonStartDate", formData.seasonStartDate);
      formDataToSend.append("seasonEndDate", formData.seasonEndDate);
      formDataToSend.append("updatedBy", user.FirstName);
      formDataToSend.append("links", JSON.stringify(formData.links));

      // Add image file if a new one was selected, otherwise use the old URL
      if (newImageFile) {
        formDataToSend.append("productImage", newImageFile);
      } else {
        formDataToSend.append("productImage", formData.productImage);
      }

      //console.log("DATA", formDataToSend);
      const plainObject = Object.fromEntries(formDataToSend.entries());
      console.log("Object", plainObject);
      console.log(JSON.stringify(plainObject));

      const res = await AxiosSecure.put(
        `/admin/update-base/${id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      } else {
        toast.success(res.data.message);
        // Refetch the data to update the "Last Updated By" and timestamp
        await fetchBase();
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
        {/* Product Image Upload */}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-semibold">Product Image</span>
          </div>
          <div className="flex justify-center items-center gap-2.5 mb-5">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input file-input-warning w-full"
            />
            <CiEdit className="text-2xl cursor-pointer" />
          </div>
          {newImageFile && (
            <p className="text-sm text-green-600">
              New image selected: {newImageFile.name}
            </p>
          )}
        </label>

        {/* Title */}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-semibold">Base Title</span>
          </div>
          <div className="flex justify-center items-center gap-2.5 mb-5">
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Base title"
              className="input input-bordered input-warning w-full "
              required
            />
            <CiEdit className="text-2xl cursor-pointer" />
          </div>
        </label>

        {/* Price */}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-semibold">
              Price <span className="text-sm italic">(Number only)</span>
            </span>
          </div>
          <div className="flex justify-center items-center gap-2.5 mb-5">
            <input
              name="price"
              type="text"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="input input-bordered input-warning w-full"
              required
            />
            <CiEdit className="text-2xl cursor-pointer" />
          </div>
        </label>

        {/* Description */}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-semibold">Description</span>
          </div>
          <div className="flex justify-center items-center gap-2.5 mb-5">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="textarea textarea-bordered input-warning w-full"
              rows={4}
            />
            <CiEdit className="text-2xl  cursor-pointer" />
          </div>
        </label>

        {/* Image */}
        <input
          name="productImage"
          value={formData.productImage}
          onChange={handleChange}
          readOnly
          placeholder="Image URL"
          className="input input-bordered input-warning w-full"
        />

        {/* Max sell */}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-semibold">
              Max Sell <span className="text-sm italic">(Number only)</span>
            </span>
          </div>
          <div className="flex justify-center items-center gap-2.5 mb-5">
            <input
              name="maxSell"
              type="text"
              value={formData.maxSell}
              onChange={handleChange}
              placeholder="maxSell"
              className="input input-bordered input-warning w-full"
              required
            />
            <CiEdit className="text-2xl cursor-pointer" />
          </div>
        </label>

        {/* Season Start Date */}
        <div className="flex items-center justify-between">
          <label className="input input-bordered input-warning">
            <span className="label-text">Season start Date :</span>
            <input
              type="date"
              name="seasonStartDate"
              value={
                formData.seasonStartDate
                  ? new Date(formData.seasonStartDate)
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
              onChange={handleChange}
              className="w-full"
            />
          </label>

          {/* Season End Date */}
          <label className="input input-bordered input-warning">
            <span className="label-text">Season End Date :</span>
            <input
              type="date"
              name="seasonEndDate"
              value={
                formData.seasonEndDate
                  ? new Date(formData.seasonEndDate).toISOString().split("T")[0]
                  : ""
              }
              onChange={handleChange}
              className="w-full"
            />
          </label>
        </div>

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
                  className="input input-bordered input-warning sm:col-span-2"
                />

                <input
                  value={link.url}
                  onChange={(e) =>
                    handleLinkChange(index, "url", e.target.value)
                  }
                  placeholder="URL"
                  className="input input-bordered input-warning sm:col-span-2"
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
      {/* Product Info section */}
      <div className="card w-full bg-gray-200 card-xs shadow-sm mt-10 py-7 px-10">
        <div className="card-body">
          <h2 className="text-lg text-blue-700 font-bold">Additional Info:</h2>
          <div className="flex justify-center items-center">
            <p className="card-title font-semibold">
              Created By:{" "}
              <span className="italic text-xl text-green-500 font-bold">
                {formData.createdBy}
              </span>{" "}
            </p>
            <span className="text-lg text-blue-500">
              {new Date(formData.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex justify-center items-center">
            <p className="card-title font-semibold">
              Last Updated By:{" "}
              <span className="text-xl text-red-500 font-bold">
                {formData.updatedBy}
              </span>{" "}
            </p>
            <span className="text-lg text-blue-500">
              {new Date(formData.updatedAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBase;
