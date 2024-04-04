import express from "express";
import {
  ForgotPassword,
  LoginUser,
  MakeVendor,
  NewPassword,
  RegisterdUser,
  VerifyOtp,
  getUser,
} from "../Controllers/UserController.js";
import { checkToken } from "../Middleware/index.js";
import {
  CreateSubUserFoodVendor,
  CreateSubUserJob,
  EditSubUserFoodVendor,
  EditSubUserJob,
  getSubUserFoodVendor,
  getSubUserJob,
} from "../Controllers/SubUserController.js";
import {
  OrderCreated,
  getOrder,
} from "../Controllers/CreateOrderController.js";
import { GetNearByResturant } from "../Controllers/NearByController.js";

const route = express.Router();

//userRoutes---------------------------------

route.route("/registerd").post(RegisterdUser);
route.route("/login").post(LoginUser);
route.route("/user").put(checkToken, MakeVendor).get(checkToken,getUser)
route.route("/verify").post(checkToken, VerifyOtp);
route.route("/forgot").post(ForgotPassword);
route.route("/newpassword").post(checkToken, NewPassword);

//Sub User Job----------------------------------
route
  .route("/user/job")
  .get(getSubUserJob)
  .post(checkToken, CreateSubUserJob)
  .put(checkToken, EditSubUserJob);

//Sub User Food Vendor----------------------------------

route
  .route("/user/foodvendor")
  .get(getSubUserFoodVendor)
  .post(checkToken, CreateSubUserFoodVendor)
  .put(checkToken, EditSubUserFoodVendor);

route.route("/order").post(checkToken, OrderCreated).get(getOrder);
route.route("/nearby").get(GetNearByResturant)
//BoatsRoutes--------------------------------

// route.route("/boat").get(getAllBoats);
// route.route("/createboat").post(checkToken, CreateBoat);
// route.route("/updateboat").post(checkToken, UpdateBoat);

export default route;
