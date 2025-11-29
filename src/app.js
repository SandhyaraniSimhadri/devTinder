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

///delete user from the database using user id
app.delete("/user",async(req,res)=>{
  const userId=req.body.userId;     
    try{  
      const user= await User.findByIdAndDelete(userId);
      //otherway 
    //   const user= await User.findByIdAndDelete({_id:userId});

       res.send("User deleted successfully");
    }catch(err){
      res.status(500).send("Error deleting user: " + err.message);
    }
});


//update user details using user id
// to add default validate function while updating we need to pass runValidators:true in the options object as 3rd param
app.patch("/user/:userId",async(req,res)=>{
  const userId=req.params?.userId;     
    const updateData=req.body;
    //if updatedData contains any fields which are not in the schema, those fields will be ignored
    // so only the fields which are in the schema will be updated, we no need to worry about that
    //fields which are not in the schema will be ignored automatically by mongoose
    //3rd param in findByIdAndUpdate is optional, if we want to return the updated document we can pass {new:true} as 3rd param
    // there are other options also which we can pass as 3rd param, we can check the mongoose documentation for that
    // some are: upsert, runValidators, context etc
    // other is returnDucument: 'after' which is same as {new:true}
    //default value is false, so it will return the old document


    //adding api level validations
    // dont allow user to update emailid
   
     
    try{ 
         const ALLOWED_UPDATES=["photoUrl","about","gender","age"];
    const isUpdateAllowed = Object.keys(updateData).every(k=> ALLOWED_UPDATES.includes(k));

    if(!isUpdateAllowed){
       res.status(400).send("Invalid updates! You can only update photoUrl, about, gender, age.");
    } 
    if(updateData?.skills.length>10){
        throw new Error("You can add maximum 10 skills");
    }
      const user= await User.findByIdAndUpdate(userId,updateData,{ new: true, runValidators: true });
      //otherway 
    //   const user = await User.findByIdAndUpdate({_id: userId}, updateData, { new: true });
         res.json(user);        
         //it will return the updated user object   
    }catch(err){
      res.status(500).send("Error updating user: " + err.message);
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
