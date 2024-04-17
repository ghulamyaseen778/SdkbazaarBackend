import { Category, SubCategory } from "../Models/CategorySchema.js";
import { errHandler, responseHandler } from "../helper/response.js";

const CreateCategory = (req, res) => {
  let body = req.body;
  Category.create(body)
    .then((data) => {
      responseHandler(res, data);
    })
    .catch((err) => {
      console.log(err);
      errHandler(res, err, 403);
    });
};
const CreateSubCategory = (req, res) => {
  let body = req.body;
  SubCategory.create(body)
    .then((data) => {
      responseHandler(res, data);
    })
    .catch((err) => {
      console.log(err);
      errHandler(res, err, 403);
    });
};

const GetCategory = (req, res) => {
  let { id } = req.query;
  let obj = {};
  if (id) {
    obj._id = id;
  }
  Category.find(obj)
    .then((data) => {
      responseHandler(res, data);
    })
    .catch((err) => {
      console.log(err);
      errHandler(res, err, 403);
    });
};
const GetSubCategory = (req, res) => {
  let { id, categoryId } = req.query;
  let obj = {};
  if (id) {
    obj._id = id;
  }
  if (categoryId) {
    obj.categoryId = categoryId;
  }
  SubCategory.find(obj)
    .then((data) => {
      responseHandler(res, data);
    })
    .catch((err) => {
      console.log(err);
      errHandler(res, err, 403);
    });
};

export { GetCategory, GetSubCategory, CreateCategory, CreateSubCategory };
