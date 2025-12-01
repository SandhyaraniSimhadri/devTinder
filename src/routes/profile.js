const express= require("express");
const profileRouter = express.Router();
const { userAuthent } = require("../middlewares/auth");
const {validateEditProfileData} = require("../utils/validation")


profileRouter.get("/profile/view", userAuthent, async (req, res) => {
  try {
    const user = req.user;
    res.send("user profile data" + user);
  } catch (err) {
    res.send("error" + err.message);
  }
});


profileRouter.patch("/profile/edit", userAuthent, async (req, res) => {
  try {
    if(!validateEditProfileData(req)){
        throw new Error("invalid edit request");

    }
    const loggedUser = req.user;
    console.log("loggeruser",loggedUser);
    const user = req.user;
    //writing this like for every field is bad
    // loggedUser.firstName = req.body.firstName
    // loggedUser.lastName = req.body.lastName

    //so other way is 
    Object.keys(req.body).forEach((key)=>loggedUser[key]=req.body[key]);

    console.log("after update loggeruser",loggedUser);
    await loggedUser.save();
    res.json({message:`${loggedUser.firstName},Profile updated successfully`,data:loggedUser});

  } catch (err) {
    res.send("error" + err.message);
  }
});



module.exports=profileRouter;