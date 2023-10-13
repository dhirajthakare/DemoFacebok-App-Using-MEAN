const axios = require('axios');
const nodemailer = require("nodemailer");
const port = process.env.PORT || 3000;

exports.homeroute = (req,res)=>{
     res.send("hello bro");
}

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

 exports.sendtestmail = (req,res)=>{

    
     var mailOptions = {
          from: 'deskbook@gmail.com',
          to: 'dhiraj9900@gmail.com',
          subject: 'test',
          html: `hi
          
          `
      }
     transport.sendMail(mailOptions, function (error, info) {
          if (error) {
              console.log(error);
          }
          else {
              console.log("Email has been send from node js", info);
          }
 });
}
