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
  user.findOne({ email: user.email }).then(async (data) => {
    if (data) {
      return res
        .status(400)
        .json({ error: "Email is already registered try new one" });
    } else {
      user = await user.save();
      if (!user) {
        return res.status(400).json({ error: "Unable to create account" });
      }
      res.send(user);
    }
  });
};
