import { CreateOrder } from "../Models/CreateOrderSchema.js";
import { errHandler, responseHandler } from "../helper/response.js";
function generateOrderId(orderLength) {
  // Prefix
  const prefix = "SDK-";

  // Increment order length by 1 and format it
  const lengthPart = String(orderLength + 1).padStart(4, "0");

  // Generate 5 random digits
  const randomNumbers = Array.from({ length: 5 }, () =>
    Math.floor(Math.random() * 10)
  ).join("");

  // Get current date in YYYYMMDD format
  const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");

  // Construct the Order ID
  const orderId = `${prefix}${lengthPart}-${randomNumbers}-${currentDate}`;

  return orderId;
}

const OrderCreated = async (req, res) => {
  let body = req.body;
  let { _id } = req.user;
  let orders = await CreateOrder.find({});
  let orderId = generateOrderId(orders.length);
  CreateOrder.create({ ...body, user_id: _id, order_id: orderId })
    .then((data) => {
      responseHandler(res, data);
    })
    .catch((err) => {
      console.log(err);
      errHandler(res, 6, 403);
    });
};
const getOrderProcessQueryParameters = (req) => {
  const mapping = {
    restutant: "resturant_id",
    user: "user_id",
    id: "_id",
    orderId: "order_id",
    number: "mobile_number",
  };

  return Object.keys(req.query).reduce((obj, key) => {
    if (mapping[key]) {
      obj[mapping[key]] = req.query[key];
    }
    return obj;
  }, {});
};

//   let { restutant, user, id, orderId, number } = req.query;
//   let obj = {};
//   if (restutant) {
//     obj.resturant_id = restutant;
//   }
//   if (user) {
//     obj.user_id = user;
//   }
//   if (id) {
//     obj._id = id;
//   }
//   if (orderId) {
//     obj.order_id = orderId;
//   }
//   if (number) {
//     obj.mobile_number = number;
//   }
const getOrder = (req, res) => {
  const queryObj = getOrderProcessQueryParameters(req);
  CreateOrder.find(queryObj)
    .then((data) => {
      responseHandler(res, data);
    })
    .catch((err) => {
      console.log(err);
      errHandler(res, 5, 403);
    });
};

export { OrderCreated,getOrder };
