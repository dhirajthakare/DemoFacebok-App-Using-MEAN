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
         user:process.env.Email,
         pass: process.env.EmailPassword
 
     }
 
 });

 exports.sendtestmail = (req,res)=>{

    
     var mailOptions = {
          from: 'dhiraj9900@gmail.com',
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
