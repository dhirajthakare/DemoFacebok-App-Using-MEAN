// All modal imported
var userModel = require("../model/users");
var transport = require("../database/mail-connection");
const bcrypt = require("bcryptjs");
const commandService = require('../services/common.Service')

const sendRecoveryEmail = async (userDetail, email, hashEmails) => {
  try {
    const otpCode = commandService.randomNum(10000000, 99999999);
    const mailOptions = {
      from: "deskbook@gmail.com",
      to: email,
      subject: `${otpCode} is your DeskBook account recovery code`,
      html: `
        <html>
        <head>
        <style>
        @media(min-width: 800px){
            #recoverCard {
                margin-left: 33%; 
                width: 33%;
            }
        }
        </style>
        </head>
        <body>
        <div id="recoverCard" >
          <div>
              <h1 style="font-weight: 600; color: rgb(63, 63, 241);">DeskBook</h1>
              <hr>
              <p>Hi ${userDetail.name} ,</p>
              <p style="line-height: 20px;">
                We received a request to reset your DeskBook password.
                Enter the following password reset code:
              </p>
      
              <div style="background-color: rgb(202, 220, 231); color: black; border: 1px solid blue;border-radius: 10px;  letter-spacing: 1px; width:35%">
                <h3 style="font-weight: 600; text-align:center">${otpCode}</h3>
              </div>
              <br>
              <p>Alternatively, you can directly change your password.</p>
              <br>
              <a href="http://localhost:4200/recover/password?Email=${hashEmails}" style="text-decoration: none;">
                <div style="background-color:rgb(63, 63, 241) ; color: white; border: 1px solid rgb(70, 70, 245);  letter-spacing: 1px;border-radius: 5px;">
                  <h3 style="text-align: center;font-weight: 500;">Change Password</h3>
                </div>
              </a>
          </div>
        </div>
        </body>
        </html>
      `,
    };

    const info = await transport.sendMail(mailOptions);

    return {
      message: "Recovery Email Sent Successfully",
      recoveryCode: otpCode,
    };
  } catch (error) {
    throw error;
  }
};

exports.sendForgotPasswordMail = async (req, res) => {
  try {
    const userDetail = await userModel.findOne({ /* your condition here */ });

    if (userDetail) {
      const result = await sendRecoveryEmail(userDetail, req.body.emails, req.body.hashEmails);
      res.json(result);
    } else {
      res.status(400).json("User not found. Please try again with valid information");
    }
  } catch (error) {
    res.status(400).json("Something went wrong while sending the email. Please try again");
  }
};


exports.checkOtpCode = (req, res) => {
  const isOtpMatched = req.body.serverOtp === req.body.userOtp;

  res.json(isOtpMatched ? "Given Code is Accepted" : "Code mismatch. Please try again.");
};


exports.changePassword = async (req, res) => {
  try {
    const data = await userModel.findOne({ email: req.body.email });

    if (data) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      await userModel.updateOne(
        { email: req.body.email },
        { $set: { password: hashPassword } }
      );

      res.json("Password Updated Successfully");
    } else {
      res.status(400).json("Token Expired. You Can't Change Password");
    }
  } catch (err) {
    res.status(400).json("Something went wrong while updating the password");
  }
};
