const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuthent = async (req, res, next) => {
    console.log("inside");
  try {
    //read the token from the req cookies
    //validate the token
    //find the userfrom the DB
    const { token } = req.cookies;
    if(!token){
        throw new Error("token is not valid");
    }
    const decodedObj = await jwt.verify(token, "DEV@Tinder2025");
    const { _id } = decodedObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("user not found");
    }
    console.log("user",user);
    req.user = user;//attaching user object to req object so that we can use it in the next middleware or route handler 
    next();
  } catch (err) {
    res.status(401).send("unauthorzes access token");
  }
};

module.exports = {
  userAuthent,
};
