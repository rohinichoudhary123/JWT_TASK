const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

 const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
     isVerified:{
        type:Boolean,
        enum:[true, false],
        default:false
     }
 } ,{
    timestamps:true
 })


 userSchema.pre("save" , async function (){
    try {
        if(!this.isModified("password")) return;
        this.password = await bcrypt.hash(this.password , 10);
        // next()
    } catch (error) {
            console.log("error bcrypt password", error);
    }
 })

userSchema.methods.comparePass = async function (EnterPassword){
    return  await bcrypt.compare(  EnterPassword , this.password)
}
userSchema.methods.generateJwt = function(){
    return jwt.sign({id: this._id} , process.env.JWT_SECRET , {
        expiresIn: "1h"
    })
}

const userModel = mongoose.model("users" , userSchema)

module.exports = userModel  