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
import { checkToken, upload } from "../Middleware/index.js";
import {
  CreateSubUserBureau,
  CreateSubUserFoodVendor,
  CreateSubUserJob,
  EditSubUserBureau,
  EditSubUserFoodVendor,
  EditSubUserJob,
  getSubUserBureau,
  getSubUserFoodVendor,
  getSubUserJob,
} from "../Controllers/SubUserController.js";
import {
  OrderCreated,
  getOrder,
} from "../Controllers/CreateOrderController.js";
import { GetNearByJobUser, GetNearByResturant } from "../Controllers/NearByController.js";
import { imageUpload } from "../Controllers/ImageController.js";
import { CreateProduct, GetProduct } from "../Controllers/ProductController.js";
import {
  CreateCategory,
  CreateSubCategory,
  GetCategory,
  GetSubCategory,
} from "../Controllers/CategoryController.js";

const route = express.Router();

//userRoutes---------------------------------

route.route("/registerd").post(RegisterdUser);
route.route("/login").post(LoginUser);
route.route("/user").put(checkToken, MakeVendor).get(checkToken, getUser);
route.route("/verify").post(checkToken, VerifyOtp);
route.route("/forgot").post(ForgotPassword);
route.route("/newpassword").post(checkToken, NewPassword);
route.route("/image").post(upload.single("file"), imageUpload);

//Sub User Job----------------------------------

route
  .route("/user/job")
  .get(checkToken, getSubUserJob)
  .post(checkToken, CreateSubUserJob)
  .put(checkToken, EditSubUserJob);

//Sub User Marige Buera----------------------------------

route
  .route("/user/bureau")
  .get(checkToken, getSubUserBureau)
  .post(checkToken, CreateSubUserBureau)
  .put(checkToken, EditSubUserBureau);

//Sub User Food Vendor----------------------------------

route
  .route("/user/foodvendor")
  .get(checkToken, getSubUserFoodVendor)
  .post(checkToken, CreateSubUserFoodVendor)
  .put(checkToken, EditSubUserFoodVendor);

route.route("/order").post(checkToken, OrderCreated).get(getOrder);
route.route("/nearby").get(GetNearByResturant);
route.route("/nearby/job").get(GetNearByJobUser);
//ProductRoutes--------------------------------

route.route("/product").post(CreateProduct).get(GetProduct);

route.route("/category").get(GetCategory).post(CreateCategory);
route.route("/subcategory").get(GetSubCategory).post(CreateSubCategory);

export default route;
