
const nodemailer = require("nodemailer");
var transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user:process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD

    }

});

module.exports=transport;