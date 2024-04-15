import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  productName:{
    type: String,
    required: true,
  },
  price:{
    type: String,
    required: true,
  },
  img:{
    type: String,
    required: true,
  }
},{timestamps:true});

export const Product = mongoose.model("product",ProductSchema)
