const express = require("express");
// require("./config/database"); //to connect to database
const app = express(); //instance of express
const connectDB = require("./config/database"); //to connect to database
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const user = require("./models/user");
const { userAuthent } = require("./middlewares/auth");

app.use(express.json()); //middleware to parse json data
app.use(cookieParser()); // middlware to parse cookies from request



// app.post("/signup", async (req, res) => {
//   try {
//     validateSignupData(req);
//     const { firstName, lastName, emailId, password } = req.body;
//     const passwordHash = await bcrypt.hash(password, 10); //10 is salt rounds,, the more the salt rounds the more secure the password but it will take more time to hash
//     console.log("Hashed Password:", passwordHash);
//     console.log("Request Body:", req.body);
//     const user = new User({
//       firstName,
//       lastName,
//       emailId,
//       password: passwordHash,
//     });

//     await user.save();
//     res.send("user signed up successfully");
//   } catch (err) {
//     res.status(500).send("Error signing up user  " + err.message);
//   }
// });

// app.post("/login", async (req, res) => {
//   try {
//     const { emailId, password } = req.body;
//     const user = await User.findOne({ emailId: emailId });
//     if (!user) {
//       return res.status(404).send("Invalid credentials");
//     }

//     // const isPasswordValid = await bcrypt.compare(password, user.password);
//     const isPasswordValid = await user.validatePassword(password);
//     if (isPasswordValid) {

//       //token expiry time is 1day
//       //generally expiry time maintained 7day, it changes depend on website
//       // const token = await jwt.sign({ _id: user._id }, "DEV@Tinder2025",{
//       //   expiresIn:"1d"
//       // });
//       const token= await user.getJWT();
//       //this will only work in http
//       // res.cookie("token", token,{httpOnly:true});
//       res.cookie("token", token,{expires:new Date(Date.now()+8*3600000)});

//       res.send("User logged in successfully");
//     } else {
//       throw new Error("Invalid credentials");
//     }
//   } catch (err) {
//     res.status(500).send("Error logging in user: " + err.message);
//   }
// });

// app.get("/profile", userAuthent, async (req, res) => {
//   try {
//     const user = req.user;
//     res.send("user profile data" + user);
//   } catch (err) {
//     res.send("error" + err.message);
//   }
// });


// app.post("/sendConnectionRequest",userAuthent ,async (req,res)=>{
// //sending a connection request
// const user=req.user;
// console.log("sending a connecction request");
// res.send(user.firstName+"connection request sent");
// });
connectDB()
  .then(() => {
    console.log("DB connected successfully");
    app.listen(3000, () => {
      console.log("server successfully listening to 3000");
    });
  })
  .catch((err) => {
    console.log("DB connection failed", err);
  });
