import mongoose from "mongoose";

const AccessSchema = new mongoose.Schema({
  key: { type: String, required: true },  // e.g., user id / username
  limit: { type: String, required: true }, // e.g., 10
  for: { type: Number, required: true }    // days, e.g., 1 = one day
});

const SubscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  access: {
    type: [AccessSchema], // array of objects
    required: true,
    default: []
  },
  price: {
    type: String,
    required: true
  },
  discount: {
    type: String // in percentage
  },
  duration:{
    type: String,
    required: true
  },
  tag:{
     type: String,
    required: true
  }
});

export const SUBSCRIPTION = mongoose.model("subscription", SubscriptionSchema);
