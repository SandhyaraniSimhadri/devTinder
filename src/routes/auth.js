const express = require("express");
const authRouter = express.Router();
const { validateSignupData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

//app.use() and authRouter.use() both are same

//app. authRouter. both works as same way
authRouter.post("/signup", async (req, res) => {
  try {
    validateSignupData(req);
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10); //10 is salt rounds,, the more the salt rounds the more secure the password but it will take more time to hash
    console.log("Hashed Password:", passwordHash);
    console.log("Request Body:", req.body);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("user signed up successfully");
  } catch (err) {
    res.status(500).send("Error signing up user  " + err.message);
  }
});


authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      return res.status(404).send("Invalid credentials");
    }

    // const isPasswordValid = await bcrypt.compare(password, user.password);
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {

      //token expiry time is 1day
      //generally expiry time maintained 7day, it changes depend on website
      // const token = await jwt.sign({ _id: user._id }, "DEV@Tinder2025",{
      //   expiresIn:"1d"
      // });
      const token= await user.getJWT();
      //this will only work in http
      // res.cookie("token", token,{httpOnly:true});
      res.cookie("token", token,{expires:new Date(Date.now()+8*3600000)});

      res.send("User logged in successfully");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(500).send("Error logging in user: " + err.message);
  }
});


authRouter.post("/logout",async (req,res)=>{
    //in bug companies, there will some other things also for logout, like cearing DB, or logout from all devices etc
    res.cookie("token",null,{
        expires: new Date(Date.now())
    });
    res.send("logout successfully");
    //we can write like below also
    //res.cookie("token",null,{
        // expires: new Date(Date.now())
    // }).send();
});

module.exports= authRouter;