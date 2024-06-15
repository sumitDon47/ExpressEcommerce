const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const crypto = require("crypto");
const sendEmail = require("../utils/setEmail");

//to register user
exports.postUser = async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  //check if email is already registered
  User.findOne({ email: user.email }).then(async (data) => {
    if (data) {
      return res
        .status(400)
        .json({ error: "Email is already registered try new one" });
    } else {
      user = await user.save();
      if (!user) {
        return res.status(400).json({ error: "Unable to create account" });
      }
      //create token and save it to the token model
      let token = new Token({
        token: crypto.randomBytes(16).toString("hex"),
        userId: user._id,
      });
      token = await token.save();
      if (!token) {
        return res.status(400).json({ error: "failed to create a token" }); //this is only for developer not for the customer
      }
      //send email process
      sendEmail({
        from: "no-reply@ecommerce.com",
        to: user.email,
        subject: "Email verification link",
        text: `Hello,\n\n please verify your email by click in the below link:\n\nhttp://${req.headers.host}/api/confirmation/${token.token}`,
        //http://localhost:8000/api/confirmation/456789
      });
      res.send(user);
    }
  });
};

//post email confirmatin
exports.postEmailConfirmation = (req, res) => {
  //at first find the valid or matching tokens
  Token.findOne({ token: req.params.token })
    .then((token) => {
      if (!token) {
        return res
          .status(400)
          .json({ error: "invalid token or token expired" });
      }
      //if we found the valid token then find the valid user for that token
      User.findOne({ _id: token.userId })
        .then((user) => {
          if (!user) {
            return res.status(400).json({
              error: "we are unable to find valid user for this token",
            });
          }
          //check if user is already verified ro not
          if (user.isVerified) {
            return res.status(400).json({
              error: "Email is already verified,please login to continue ",
            });
          }
          //save the verified user
          user.isVerified = true;
          user
            .save()
            .then((user) => {
              if (!user) {
                return res
                  .status(400)
                  .json({ error: "failed to verify email" });
              }
              res.json({
                message: "congrats, your email has been verified successful",
              });
            })
            .catch((err) => {
              return res.status(400).json({ error: err });
            });
        })
        .catch((err) => {
          return res.status(400).json({ error: err });
        });
    })
    .catch((err) => {
      return res.status(400).json({ error: err });
    });
};
