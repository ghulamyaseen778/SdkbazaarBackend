import { SUBSCRIPTION } from "../Models/SubscriptionSchema.js";


// ✅ Create Subscription
export const createSubscription = async (req, res) => {
  try {
    const subscription = new SUBSCRIPTION(req.body);
    await subscription.save();
    res.status(201).json({ message: "Subscription created", subscription });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get All Subscriptions
export const getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await SUBSCRIPTION.find();
    res.json(subscriptions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get Single Subscription
export const getSubscription = async (req, res) => {
  try {
    const subscription = await SUBSCRIPTION.findById(req.params.id);
    if (!subscription) return res.status(404).json({ message: "Not found" });
    res.json(subscription);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update Subscription
export const updateSubscription = async (req, res) => {
  try {
    const subscription = await SUBSCRIPTION.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!subscription) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Subscription updated", subscription });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete Subscription
export const deleteSubscription = async (req, res) => {
  try {
    const subscription = await SUBSCRIPTION.findByIdAndDelete(req.params.id);
    if (!subscription) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Subscription deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Add Access
export const addAccess = async (req, res) => {
  try {
    const { key, limit, forDays } = req.body;
    const subscription = await SUBSCRIPTION.findById(req.params.id);
    if (!subscription) return res.status(404).json({ message: "Not found" });

    subscription.access.push({ key, limit, for: forDays });
    await subscription.save();
    res.json({ message: "Access added", subscription });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update Access
export const updateAccess = async (req, res) => {
  try {
    const { key } = req.params;
    const { limit, forDays } = req.body;

    const subscription = await SUBSCRIPTION.findOneAndUpdate(
      { _id: req.params.id, "access.key": key },
      { $set: { "access.$.limit": limit, "access.$.for": forDays } },
      { new: true }
    );

    if (!subscription) return res.status(404).json({ message: "Access not found" });
    res.json({ message: "Access updated", subscription });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Remove Access
export const removeAccess = async (req, res) => {
  try {
    const subscription = await SUBSCRIPTION.findByIdAndUpdate(
      req.params.id,
      { $pull: { access: { key: req.params.key } } },
      { new: true }
    );

    if (!subscription) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Access removed", subscription });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};