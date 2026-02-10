import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "../../AuthProvider/AuthContext";
import { Link } from "react-router-dom";

const CreateBases = () => {
  const [loading, setLoading] = useState(false);
  const AxiosSecure = useAxiosSecure();
  const { user } = useAuth();
  console.log(user);

  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      links: [{ label: "", url: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("price", data.price);
      formData.append("badge", data.badge);
      formData.append("description", data.description);
      formData.append("townHall", data.townHall);
      formData.append("maxSell", data.maxSell);
      formData.append("seasonStartDate", data.seasonStartDate);
      formData.append("seasonEndDate", data.seasonEndDate);
      formData.append("productImage", data.productImage[0]);
      formData.append("createdBy", user.FirstName);

      formData.append("links", JSON.stringify(data.links));

      const res = await AxiosSecure.post("/admin/create-product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // const plainObject = Object.fromEntries(formData.entries());
      // console.log("Object", plainObject);
      // You can then stringify it for sending as JSON if needed
      // console.log(JSON.stringify(plainObject));

      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }

      toast.success("Product created successfully!");
      reset();
    } catch (error) {
      toast.error(error.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto  p-8 rounded-lg shadow">
      <div className="flex justify-end text-white">
        <Link
          to="/adminDashboard"
          className=" bg-green-500 p-2 rounded hover:bg-green-600"
        >
          Go back
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-6">Create Product</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Product Image */}
        <input
          type="file"
          accept="image/*"
          {...register("productImage", { required: true })}
          className="file-input file-input-warning w-full"
        />

        {/* Title */}
        <input
          type="text"
          placeholder="Product Heading"
          {...register("title", { required: true })}
          className="input input-bordered w-full"
        />

        {/* Price */}
        <input
          type="number"
          placeholder="Price"
          {...register("price", { required: true })}
          className="input input-bordered w-full"
        />

        {/* Badge */}
        <input
          type="text"
          placeholder="Badge : 1 X 5"
          {...register("badge", { required: true })}
          className="input input-bordered w-full"
        />

        {/* Town Hall */}
        <input
          type="text"
          placeholder="Ex. Town Hall 15"
          {...register("townHall", { required: true })}
          className="input input-bordered w-full"
        />

        {/* Description */}
        <textarea
          placeholder="Product Description"
          {...register("description", { required: true })}
          className="textarea textarea-bordered w-full h-32"
        />

        {/*  Max sell count */}
        <input
          type="number"
          placeholder="Max Sell"
          {...register("maxSell")}
          className="input input-bordered w-full"
        />

        <label className="input input-bordered">
          <span className="label-text">Season Start Date :</span>
          <input
            type="date"
            {...register("seasonStartDate")}
            className="w-full"
          />
        </label>

        <label className="input input-bordered">
          <span className="label-text">Season End Date :</span>
          <input
            type="date"
            {...register("seasonEndDate")}
            className="w-full"
          />
        </label>

        {/* Dynamic Links */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Product Links</h2>

          {fields.map((item, index) => (
            <div key={item.id} className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="Link name (e.g. Amazon)"
                {...register(`links.${index}.label`, { required: true })}
                className="input input-bordered w-1/3"
              />

              <input
                type="text"
                placeholder="https://..."
                {...register(`links.${index}.url`, { required: true })}
                className="input input-bordered flex-1"
              />

              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="btn btn-error btn-sm"
                >
                  <DeleteIcon />
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={() => append({ label: "", url: "" })}
            className="btn btn-outline btn-warning"
          >
            <AddIcon /> Add another link
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-warning w-full text-black font-semibold"
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default CreateBases;
