const express = require("express")
const { registerController, loginController, logoutController, verifyEmail, getUserController } = require("../controllers/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware")



const router = express.Router()

router.post("/register" , registerController)
router.post("/login" , loginController)
router.post("/logout" , authMiddleware , logoutController)

router.get("/verify-email/:token", verifyEmail)
router.get("/get-user" , authMiddleware , getUserController)
module.exports = router