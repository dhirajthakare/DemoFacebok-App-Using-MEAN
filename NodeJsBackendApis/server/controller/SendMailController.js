// All modal imported
var userModel = require("../model/users");
var transport = require("../database/mailConnection");
const bcrypt = require("bcryptjs");

// Send Mail Recovery
exports.sendTestMail = (req, res) => {
  userModel
    .findOne({ email: req.body.emails })
    .then((response) => {
      if (response) {
        var otpCode = randomNum(10000000, 99999999);
        var mailOptions = {
          from: "deskbook@gmail.com",
          to: req.body.emails,
          subject:
            otpCode +
            ` is your DeskBook account recovery code
        `,
          html:
            `
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
      <p>Hi ` +
            response.name +
            ` ,</p>
      <p style="line-height: 20px;">
We received a request to reset your DeskBook password.
Enter the following password reset code:
      </p>

      <div style="background-color: rgb(202, 220, 231); color: black; border: 1px solid blue;border-radius: 10px;  letter-spacing: 1px; width:35%"><h3 style="font-weight: 600; text-align:center">` +
            otpCode +
            `</h3></div>
 <br> <p>Alternatively, you can directly change your password.</p> <br>
 <a href="http://localhost:4200/recover/password?Email=` +
            req.body.hashEmails +
            `" style="text-decoration: none;"><div style="background-color:rgb(63, 63, 241) ; color: white; border: 1px solid rgb(70, 70, 245);  letter-spacing: 1px;border-radius: 5px;"><h3 style="text-align: center;font-weight: 500;">Change Password</h3></div></a>

  </div>
</div>
        </body>
        </html>
        
        `,
        };
        transport.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
            res.status(400).json("Something wrong Please try Again");
          } else {
            // console.log("Email has been send from node js", info);
            res.json({
              message: "Recovery Email Send Successfully ",
              recoveryCode: otpCode,
            });
          }
        });
      } else {
        res
          .status(400)
          .json(
            "Your search did not return any results. Please try again with other information"
          );
      }
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json("Something wrong while check mail ");
    });
};

exports.checkOtpCode = (req, res) => {
  if (req.body.serverOtp == req.body.userOtp) {
    res.json("Given Code is Accepted ");
  } else {
    res
      .status(400)
      .json(
        "The number that you've entered doesn't match your code. Please try again."
      );
  }
};

exports.changePassword = async (req, res) => {
  let data = await userModel.findOne({ email: req.body.email });
  if (data) {
    let salt = await bcrypt.genSalt(10);
    hashPassword = await bcrypt.hash(req.body.password, salt);
    userModel
      .updateOne(
        { email: req.body.email },
        {
          $set: {
            password: hashPassword,
          },
        }
      )
      .then((response) => {
        res.json("Password Updated Successfully");
      })
      .catch((err) => {
        res.status(400).json("Something wrong while update Password ");
      });
  } else {
    res.status(400).json("Token Expired You Can't Change Password");
  }
};

// randomFunction
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
