import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true, //product,job,etc
  },
});

const SubCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  categoryId: {
    type: String,
    required: true,
  },
});

export const Category = mongoose.model("category",CategorySchema)
export const SubCategory = mongoose.model("subcategory",SubCategorySchema)
