import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const CreateBases = () => {
  const [loading, setLoading] = useState(false);
  const AxiosSecure = useAxiosSecure();

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
      formData.append("description", data.description);
      formData.append("productImage", data.productImage[0]);

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
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
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

        {/* Description */}
        <textarea
          placeholder="Product Description"
          {...register("description", { required: true })}
          className="textarea textarea-bordered w-full h-32"
        />

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
