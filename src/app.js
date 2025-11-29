const express = require("express");
// require("./config/database"); //to connect to database
const app = express(); //instance of express
const connectDB= require("./config/database"); //to connect to database
const User=require("./models/user");


app.use(express.json()); //middleware to parse json data
app.post("/signup",async (req,res)=>{
  console.log("Request Body:", req.body);  
  const user = new User(req.body);
  try{
      await user.save();
      res.send("user signed up successfully");
  }
  catch(err){
      res.status(500).send("Error signing up user"+err.message);
  }     
});


//Feed API - GET /feed - get all the users from the database
// we need to get all the users from the database and send it to the client
// so we need to use User model to get the users from the database

// to get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;       
    try {  
      const users = await User.find({ emailId: userEmail });
       if(users.length === 0){
        return res.status(404).send("User not found");
       }       
        res.json(users);
        //it will give array of users because find method always returns array
    } catch (err) {
        res.status(500).send("Error fetching user: " + err.message);
    }   
});

//it will give one user object instead of array because findOne method returns single document
// it will give oldest document if there are multiple documents with same emailId
//if we dont have any document with that emailId it will return null
//if we dont pass emailId in the req.body it will return first document in the collection
app.get("/userOne", async (req, res) => {
  const userEmail = req.body.emailId;       
    try {  
      const user = await User.findOne({ emailId: userEmail });
       if(user.length === 0){
        return res.status(404).send("User not found");
       }       
        res.json(user);
        //it will give array of users because find method always returns array
    } catch (err) {
        res.status(500).send("Error fetching user: " + err.message);
    }   
});
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({}); //fetch all users from the database
    res.json(users);
  } catch (err) {
    res.status(500).send("Error fetching users: " + err.message);
  }
});

connectDB().then(()=>{ 
    console.log("DB connected successfully");
    app.listen(3000,()=>{
    console.log("server successfully listening to 3000");
});
}).catch((err)=>{
    console.log("DB connection failed",err);
});
