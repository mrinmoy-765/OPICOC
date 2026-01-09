import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    badge: { type: String, required: true },
    description: { type: String, required: true },
    productImage: { type: String, required: true },

    links: [
      {
        label: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const productModel =
  mongoose.models.products || mongoose.model("products", productSchema);

export default productModel;
