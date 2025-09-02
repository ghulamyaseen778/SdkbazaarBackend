import mongoose from "mongoose";

const UserSubscriptionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  subscriptionId: {
    type: String,
    required: true,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  startDate: {
    type: String,
  },
  expireDate: {
    type: String,
  },
  uploadScreenShot: {
    type: String,
    required: true,
  },
  reject: {
    type: Boolean,
    default: false,
  },
  reason: {
    type: String,
  },
});


export const USER_SUBSCRIPTION = mongoose.model("userSubscription", UserSubscriptionSchema);