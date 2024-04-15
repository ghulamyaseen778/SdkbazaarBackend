import {
  SubUserBureau,
  SubUserFood,
  SubUserJob,
} from "../Models/SubUserSchema.js";
import User from "../Models/UserSchema.js";
import { errHandler, responseHandler } from "../helper/response.js";

//-------------creating----------------

const CreateSubUserJob = (req, res) => {
  let body = req.body;
  let { id } = req.user;
  SubUserJob.create({ ...body, userId: id })
    .then(async (data) => {
      await User.findByIdAndUpdate(id, { role: "job" }, { new: true });
      responseHandler(res, data);
    })
    .catch((err) => {
      console.log(err, "CreateSubUserJob");
      errHandler(res, 5, 403);
    });
};

const CreateSubUserBureau = (req, res) => {
  let body = req.body;
  let { id } = req.user;
  SubUserBureau.create({ ...body, userId: id })
    .then(async (data) => {
      await User.findByIdAndUpdate(id, { role: "bureau" }, { new: true });
      responseHandler(res, data);
    })
    .catch((err) => {
      console.log(err, "CreateSubUserBureau");
      errHandler(res, 5, 403);
    });
};

const CreateSubUserFoodVendor = (req, res) => {
  let body = req.body;
  let { id } = req.user;
  SubUserFood.create({ ...body, userId: id })
    .then(async (data) => {
      await User.findByIdAndUpdate(id, { role: "foodvendor" }, { new: true });
      responseHandler(res, data);
    })
    .catch((err) => {
      console.log(err, "CreateSubUqserFoodVendor");
      errHandler(res, 5, 403);
    });
};

//---------------getting--------------------

const getSubUserJob = (req, res) => {
  let { userId, id, phone, on } = req.query;
  let { _id } = req.user;
  let obj = {};
  if (id) {
    obj._id = id;
  }
  if (userId) {
    obj.userId = userId;
  }
  if (phone) {
    obj.phone = phone;
  }
  if (on == "1") {
    obj._id = _id;
  }
  SubUserJob.find(obj)
    .then((data) => {
      responseHandler(res, data);
    })
    .catch((err) => {
      console.log(err, "getSubUserJob"), errHandler(res, 5, 403);
    });
};
const getSubUserBureau = (req, res) => {
  let { userId, id, phone, on } = req.query;
  let { _id } = req.user;
  let obj = {};
  if (id) {
    obj._id = id;
  }
  if (userId) {
    obj.userId = userId;
  }
  if (phone) {
    obj.phone = phone;
  }
  if (on == "1") {
    obj._id = _id;
  }
  SubUserBureau.find(obj)
    .then((data) => {
      responseHandler(res, data);
    })
    .catch((err) => {
      console.log(err, "getSubUserBureau"), errHandler(res, 5, 403);
    });
};
const getSubUserFoodVendor = (req, res) => {
  let { userId, id, phone, on } = req.query;
  let { _id } = req.user;
  let obj = {};
  if (id) {
    obj._id = id;
  }
  if (userId) {
    obj.userId = userId;
  }
  if (phone) {
    obj.phone = phone;
  }
  if (on == "1") {
    obj._id = _id;
  }
  SubUserFood.find(obj)
    .then((data) => {
      responseHandler(res, data);
    })
    .catch((err) => {
      console.log(err, "getSubUserFoodVendor"), errHandler(res, 5, 403);
    });
};

//--------------------Editing---------------------

const EditSubUserJob = (req, res) => {
  const body = req.body;
  const { _id } = req.user;

  SubUserJob.findByIdAndUpdate(_id, body, { new: true })
    .then((data) => {
      responseHandler(res, data);
    })
    .catch((err) => {
      errHandler(res, 5, 403);
    });
};
const EditSubUserFoodVendor = (req, res) => {
  const body = req.body;
  const { _id } = req.user;

  SubUserFood.findByIdAndUpdate(_id, body, { new: true })
    .then((data) => {
      responseHandler(res, data);
    })
    .catch((err) => {
      errHandler(res, 5, 403);
    });
};
const EditSubUserBureau = (req, res) => {
  const body = req.body;
  const { _id } = req.user;

  SubUserBureau.findByIdAndUpdate(_id, body, { new: true })
    .then((data) => {
      responseHandler(res, data);
    })
    .catch((err) => {
      errHandler(res, 5, 403);
    });
};

export {
  CreateSubUserBureau,
  CreateSubUserJob,
  CreateSubUserFoodVendor,
  getSubUserBureau,
  getSubUserJob,
  getSubUserFoodVendor,
  EditSubUserBureau,
  EditSubUserJob,
  EditSubUserFoodVendor,
};
