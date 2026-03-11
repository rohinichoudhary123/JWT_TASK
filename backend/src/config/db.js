const { default: mongoose } = require("mongoose")

const connectDb = async() =>{
    try {
        let res = await mongoose.connect(process.env.URI_MONGO)
        console.log("Mongoose  is connected");
         
    } catch (error) {
           console.log("Mongoose  is  not connected");
    }
}


module.exports = connectDb