require("dotenv").config()
const express = require("express")
const AuthRouter = require("./routers/auth.router")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const errorMiddleware = require("./middlewares/error.middleware")
const userRouter = require("./routers/user.router")
const app = express()
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use("/api/auth" , AuthRouter)

app.use("/api/user" , userRouter )



app.use(errorMiddleware)
module.exports = app



