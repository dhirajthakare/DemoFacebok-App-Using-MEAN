
const nodemailer = require("nodemailer");
var transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user:process.env.Email,
        pass: process.env.EmailPassword

    }

});

module.exports=transport;