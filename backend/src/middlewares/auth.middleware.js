const userModel = require("../models/user.model");
const CustomError = require("../utils/customError");
const jwt = require("jsonwebtoken");
const authMiddleware = async (req, res, next) => {
  let token = req.cookies.token;

  if (!token) throw new CustomError("Token Not found", 404);

  let decode = jwt.verify(token, process.env.JWT_SECRET);

  if (!decode) throw new CustomError("Invalid Token ");

  let user = await userModel.findById(decode.id).select("-password");

  req.user = user;

  next();
};

module.exports = authMiddleware;
