import mongoose from "mongoose";

const CreateOrderSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    resturant_id: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    mobile_number: {
      type: String,
      required: true,
    },
    payment_method: {
      type: String,
      required: true,
    },
    payment_status: {
      type: String,
      default: false,
    },
    items: {
      type: Array, // name, quntity, price,id
      required: true,
    },
    sub_total: {
      type: String,
      required: true,
    },
    delivery_fees: {
      type: String,
      required: true,
    },
    platform_fees: {
      type: String,
      required: true,
    },
    order_id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: false,
    },
  },
  { timestamps: true }
);

export const CreateOrder = mongoose.model("order", CreateOrderSchema);
