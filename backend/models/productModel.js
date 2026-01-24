import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    badge: { type: String, required: true },
    description: { type: String, required: true },
    townHall: { type: String, required: true },
    productImage: { type: String, required: true },
    createdBy: { type: String, required: true },
    updatedBy: { type: String, required: false },

    maxSell: { type: Number, required: false },
    seasonStartDate: { type: Date, required: false },
    seasonEndDate: { type: Date, required: false },

    links: [
      {
        label: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
);

const productModel =
  mongoose.models.products || mongoose.model("products", productSchema);

export default productModel;
