import { Product } from "../Models/ProductsSchem.js";
import { errHandler, responseHandler } from "../helper/response";

const CreateProduct = (req, res) => {
  const body = req.body;
  Product.create(body)
    .then((data) => {
      responseHandler(res, data);
    })
    .catch(() => {
      errHandler(res, 5, 403);
    });
};

const GetProduct = (req, res) => {
  const { id, resturantId } = req.query;
  let obj = {};
  if (id) {
    obj._id = id;
  }
  if (resturantId) {
    obj.resturantId = resturantId;
  }
  Product.find(obj)
    .then((data) => {
      responseHandler(res, data);
    })
    .catch(() => {
      errHandler(res, 5, 403);
    });
};

export { GetProduct, CreateProduct };
