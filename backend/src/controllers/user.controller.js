const asyncHandler = require("../utils/asyncHandler");


const profileController = asyncHandler(async(req, res) =>{


    return res.status(200).json({
        success:true,
        message:"Profile fetch",
        user : req.user
    })
})


module.exports = {profileController}