import { SubUserFood } from "../Models/SubUserSchema.js";
import User from "../Models/UserSchema.js";
import geolib from "geolib";
import { errHandler, responseHandler } from "../helper/response.js";

const GetNearByResturant = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;
    const users = await User.find({ role: "foodvendor" });
    const userIds = await users.map((user) => user._id);
    const restaurants = await SubUserFood.find({ userId: { $in: userIds } });
    const nearbyRestaurants = restaurants.filter((restaurant) => {
      const distance = geolib.getDistance(
        { latitude, longitude },
        {
          latitude: restaurant.latitude,
          longitude: restaurant.longitude,
        }
      );
      return distance <= 1000; // Adjust the radius as per your requirement
    });
    responseHandler(res, nearbyRestaurants);
  } catch (error) {
    errHandler(res, 5, 403);
  }
};

export { GetNearByResturant };
