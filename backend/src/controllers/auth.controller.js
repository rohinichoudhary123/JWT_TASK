const userModel = require("../models/user.model");
const sendMail = require("../services/mail.Services");
const asyncHandler = require("../utils/asyncHandler");
const CustomError = require("../utils/customError");
const jwt = require("jsonwebtoken");
const registerController = asyncHandler(async (req, res) => {
  let { username, email, password } = req.body;

  if (!username || !email || !password)
    throw new CustomError("All field required", 400);

  let isExist = await userModel.findOne({ email });

  if (isExist) throw new CustomError("Email Already Exist", 401);

  console.log("check 1");

  let newUser = await userModel.create({
    username,
    email,
    password,
  });
  if (!newUser) throw new CustomError("Something went wrong");

  console.log("check 2");

  let resetToken = jwt.sign({ email }, process.env.RAW_SECRET, {
    expiresIn: "12h",
  });

  console.log("check 3");

  let resetLink = `http://localhost:5173/verify-link/${resetToken}`;

  await sendMail(email, "verification Mail", resetLink);

  let token = newUser.generateJwt();
  console.log("check 4");

  res.cookie("token", token);

  console.log("check 5");
  return res.status(201).json({
    success: true,
    message: "User Register",
    user: newUser,
  });
});

const loginController = asyncHandler(async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) throw new CustomError("All Field are required", 400);

  let isExist = await userModel.findOne({ email });

  if (!isExist) throw new CustomError("User Not Found", 401);


  let checkPass = await isExist.comparePass(password);

  if (!checkPass) throw new CustomError("Invalid credentials", 401);

 if(!isExist.isVerified){
   throw new CustomError("User Not Verified", 400)
 } 
  
  let token = isExist.generateJwt();



  res.cookie("token", token);

  return res.status(200).json({
    success: true,
    message: "user login",
    user: isExist,
  });
});

const logoutController = asyncHandler(async (req, res) => {
  let userId = req.user._id;

  if (!userId) throw new CustomError("Unauthorized user!", 400);

  res.clearCookie("token");

  return res.status(200).json({
    success: true,
    message: "User Logged out",
  });
});

const verifyEmail = asyncHandler(async (req, res) => {
  let{ token }= req.params;
  console.log(token)
  if (!token) throw new CustomError("Token Not found", 404);

  let decode = jwt.verify(token, process.env.RAW_SECRET);

  let user = await userModel.findOne({ email: decode.email });

   user.isVerified = true
   await user.save()
 
return res.status(200).json({
  success:true,
  message:" User Verify"
})
});


const getUserController = asyncHandler(async(req, res) =>{

  return res.status(200).json({
    success:true,
    message:"User fetch successfully ",
    user: req.user
  })
  
})

module.exports = {
  registerController,
  loginController,
  logoutController,
  verifyEmail,
  getUserController
};
