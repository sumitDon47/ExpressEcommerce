const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const crypto = require("crypto");
const sendEmail = require("../utils/setEmail");
const jwt = require('jsonwebtoken'); // authentication
const { expressjwt } = require('express-jwt');


// to register user
exports.postUser = async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  // check if email is already registered
  User.findOne({ email: user.email }).then(async (data) => {
    if (data) {
      return res
        .status(400)
        .json({ error: "Email is already registered, try a new one" });
    } else {
      user = await user.save();
      if (!user) {
        return res.status(400).json({ error: "Unable to create account" });
      }
      // create token and save it to the token model
      let token = new Token({
        token: crypto.randomBytes(16).toString("hex"),
        userId: user._id,
      });
      token = await token.save();
      if (!token) {
        return res.status(400).json({ error: "Failed to create a token" });
      }
      // send email process
      sendEmail({
        from: "no-reply@ecommerce.com",
        to: user.email,
        subject: "Email verification link",
        text: `Hello,\n\nPlease verify your email by clicking on the link below:\n\nhttp://${req.headers.host}/api/confirmation/${token.token}`,
      });
      res.send(user);
    }
  });
};

// post email confirmation
exports.postEmailConfirmation = (req, res) => {
  // at first, find the valid or matching tokens
  Token.findOne({ token: req.params.token })
    .then((token) => {
      if (!token) {
        return res.status(400).json({ error: "Invalid token or token expired" });
      }
      // if we found the valid token, then find the valid user for that token
      User.findOne({ _id: token.userId })
        .then((user) => {
          if (!user) {
            return res.status(400).json({
              error: "We are unable to find a valid user for this token",
            });
          }
          // check if user is already verified or not
          if (user.isVerified) {
            return res.status(400).json({
              error: "Email is already verified, please log in to continue",
            });
          }
          // save the verified user
          user.isVerified = true;
          user
            .save()
            .then((user) => {
              if (!user) {
                return res
                  .status(400)
                  .json({ error: "Failed to verify email" });
              }
              res.json({
                message: "Congrats, your email has been verified successfully",
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

// sign in process
exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  // at first, check if email is registered in the system or not
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(503).json({
      error: "Sorry, the email you provided is not found in our system. Please register first or try another.",
    });
  }

  // if email is found, then check the password for that email
  if (!user.authenticate(password)) {
    return res.status(400).json({ error: "Email and password do not match" });
  }
  // check if user is verified or not
  if (!user.isVerified) {
    return res.status(400).json({ error: "Verify your email first to continue" });
  }
  // now generate token with user Id and jwt secret
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  // STORE TOKEN IN THE COOKIE
  res.cookie('myCookie', token, { expire: Date.now() + 99999 });

  // return user information to frontend
  const { _id, name, role } = user;
  return res.json({ token, user: { name, role, email, _id } });
};

//forget password

exports.forgetPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return res.status(403).json({
      error: "Sorry, the email you provided is not found in our system. Please register first or try another."
    })
  }
  let token = new Token({
    token: crypto.randomBytes(16).toString("hex"),
    userId: user._id,
  });
  token = await token.save()
  if (!token) {
    return res.status(400).json({ error: 'Failed to create a token' });
  }
  // send email process
  sendEmail({
    from: "no-reply@ecommerce.com",
    to: user.email,
    subject: "password Reset link",
    text: `Hello,\n\nPlease reset your password by clicking on the link below:\n\nhttp://${req.headers.host}/api/resetpassword/${token.token}`,
    //http://localhost:8000/api/resetpassword/45678
  });
  res.json({ message: 'password reset link has been sent successfully' })
}

//reset password
exports.resetPassword = async (req, res) => {
  //find the valid token
  let token = await Token.findOne({ token: req.params.token })
  if (!token) {
    return res.status(400).json({ error: 'Invalid token or token may have expired' })

  }

  //if we found valid token then find the valid user for that token 
  let user = await User.findOne({ _id: token.userId })
  if (!user) {
    return res.status(400).json({ error: 'we are unbale to find the valid user for this token' })
  }

  //reset the password 
  user.password = req.body.password
  user = await user.save()
  if (!user) {
    return res.status(500).json({ error: 'failed to reset password' }

    )
    res.json({ message: 'password has been reset successfully, login to continue' })
  }

}

//user list
exports.userList = async (req, res) => {
  const user = await User.find()
    .select('-hashed_password') //yo na dekauna ko lagiii
    .select('-salt')
  if (!user) {
    return res.status(400).json({ error: 'something went wrong' })
  }
  res.send(user)
}

//user details
exports.userDetails = async (req, res) => {
  const user = await User.findById(req.params.id)
    .select('-hashed_password') //yo na dekauna ko lagiii
    .select('-salt')
  if (!user) {
    return res.status(400).json({ error: 'something went wrong' })
  }
  res.send(user)
}
