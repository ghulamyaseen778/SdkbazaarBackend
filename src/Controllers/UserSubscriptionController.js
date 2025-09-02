import { SUBSCRIPTION } from "../Models/SubscriptionSchema.js";
import { USER_SUBSCRIPTION } from "../Models/UserSubscriptionSchema.js";

// 1. Create User Subscription Request
export const createUserSubscription = async (req, res) => {
  try {
    const {_id}=req.user
    const data = new USER_SUBSCRIPTION({userId:_id,...req.body});
    await data.save();
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// 2. Get All User Subscriptions
export const getAllUserSubscriptions = async (req, res) => {
  try {
    const data = await USER_SUBSCRIPTION.find().populate("subscriptionId");
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 3. Get Single User Subscription
export const getUserSubscriptionById = async (req, res) => {
  try {
    const data = await USER_SUBSCRIPTION.findOne({userId:req.user._id}).populate("subscriptionId");
    if (!data) return res.status(404).json({ success: false, message: "Not Found" });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 4. Update User Subscription
export const updateUserSubscription = async (req, res) => {
  try {
    const data = await USER_SUBSCRIPTION.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// 5. Delete User Subscription
export const deleteUserSubscription = async (req, res) => {
  try {
    await USER_SUBSCRIPTION.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 6. Approve Subscription (Admin)
export const approveUserSubscription = async (req, res) => {
  try {
    const userSub = await USER_SUBSCRIPTION.findById(req.params.id);
    if (!userSub) return res.status(404).json({ success: false, message: "Not Found" });

    const subscription = await SUBSCRIPTION.findById(userSub.subscriptionId);
    if (!subscription) return res.status(404).json({ success: false, message: "Subscription not found" });

    const today = new Date();
    const expireDate = new Date(today);
    expireDate.setDate(expireDate.getDate() + subscription.duration);

    userSub.isApproved = true;
    userSub.startDate = today.toISOString().split("T")[0];
    userSub.expireDate = expireDate.toISOString().split("T")[0];
    userSub.reject = false;
    userSub.reason = null;

    await userSub.save();
    res.json({ success: true, data: userSub });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 7. Reject Subscription (Admin)
export const rejectUserSubscription = async (req, res) => {
  try {
    const { reason } = req.body;
    const userSub = await USER_SUBSCRIPTION.findById(req.params.id);
    if (!userSub) return res.status(404).json({ success: false, message: "Not Found" });

    userSub.reject = true;
    userSub.isApproved = false;
    userSub.reason = reason || "Rejected by admin";

    await userSub.save();
    res.json({ success: true, data: userSub });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
