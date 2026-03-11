const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASS,
    }
})


const sendMail = async (to , subject , html) =>{
    const options = {
        to,
        subject,
        html
    }

    return await transporter.sendMail(options)
}

module.exports = sendMail