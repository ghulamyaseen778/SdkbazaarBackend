import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    resturantId: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    categories: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    time:{
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

export const Product = mongoose.model("product", ProductSchema);
