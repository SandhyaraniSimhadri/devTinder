const express = require("express");
// require("./config/database"); //to connect to database
const app = express(); //instance of express
const connectDB = require("./config/database"); //to connect to database
const User = require("./models/user");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json()); //middleware to parse json data
app.use(cookieParser()); // middlware to parse cookies from request
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");


app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);
app.use('/',userRouter);


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
