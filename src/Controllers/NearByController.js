import { SubUserFood, SubUserJob } from "../Models/SubUserSchema.js";
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
      return distance <= 5000; // Adjust the radius as per your requirement
    });
    responseHandler(res, nearbyRestaurants);
  } catch (error) {
    console.log(error, "l");
    errHandler(res, 5, 403);
  }
};

const GetNearByJobUser = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;
    const users = await User.find({ role: "job" });
    const userIds = await users.map((user) => user._id);
    const Joob = await SubUserJob.find({ userId: { $in: userIds } });
    console.log(latitude, longitude);
    const nearbyJoob = Joob.filter((Jo) => {
      const distance = geolib.getDistance(
        { latitude: Number(latitude), longitude: Number(longitude) },
        {
          latitude: Number(Jo.latitude),
          longitude: Number(Jo.longitude),
        }
      );
      console.log(distance, "distance");
      return distance <= 5000; // Adjust the radius as per your requirement
    });
    responseHandler(res, nearbyJoob);
  } catch (error) {
    console.log(error, "l");
    errHandler(res, 5, 403);
  }
};

export { GetNearByResturant, GetNearByJobUser };
