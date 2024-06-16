const express = require("express");
const {
    postUser,
    postEmailConfirmation,
    signIn,
    forgetPassword,
    resetPassword,
    userList,
    userDetails,
    signOut,
    requireSignin
} = require("../controllers/userController");
const router = express.Router();

router.post("/register", postUser);
router.put("/confirmation/:token", postEmailConfirmation);
router.post('/signin', signIn);
router.post('/forgetpassword', forgetPassword)
router.put('/resetpassword/:token', resetPassword)
router.get('/userlist', requireSignin, userList)
router.get('/userdetails/:id', requireSignin, userDetails)
router.post('/signout', signOut)

module.exports = router;
