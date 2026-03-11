const errorMiddleware = async(err , req , res , next) =>{
    console.log("message error" , err.message);

    let statusCode = err.statusCode || 500;

    return res.status(statusCode).json({
        message:err.message || "Internal Server error",
        success:false
    })
    
}

module.exports = errorMiddleware