const express = require("express");
// require("./config/database"); //to connect to database
const app = express(); //instance of express
const connectDB= require("./config/database"); //to connect to database
const User=require("./models/user");




// app.post("/signup",async (req,res)=>{
    //login to add data into DB
 
    //to save this userObj into DB, we need to use mongoose model so we need to import that model here and need to create instance of that model
    //creating new user with above userObj means creating new instance of User model
    
    //    const userObj={
    //     firstName:"sandhya",
    //     lastName:"rani",
    //     emailId:"sandhya@example.com",
    //     password:"sandhya123",
    //     age:22,
    //     gender:"female"
    // }
    // const user = new User(userObj);
    //other way is to directly pass the object in the constructor
    // const user = new User({
    //     firstName:"sandhya",
    //     lastName:"rani",
    //     emailId:"sandhya@example.com",
    //     password:"sandhya123",
    //     age:22,
    //     gender:"female"
    // });
    //to save the user to DB we need to call save method becuase its instance method
//    await user.save();// this will return prmise, so we need to use async await or then catch
//     res.send("user signed up successfully");
    //devTinder is a database which is created automatically when we save the first document
    // users is collection which is created automatically when we save the first document
    //mongodb added _id and __v fields automatically because of mongoose
    //_id is unique id for each document and called as mondo object id, it will uniquely identify each document in the collection
    // __v is version key, used to track the document version in the collection
    //we can pass the _id manually also while creating the document but its not recommended because mongoose will create unique id automatically
    //__v will be used internally by mongoose for versioning of documents, its not recommended to modify it manually, it will get updated automatically by mongoose when we update the document
    //when we are doing any db operations, wrap those operations in try catch block to handle the errors properly
// try{
//     await user.save();// this will return prmise, so we need to use async await or then catch
//     res.send("user signed up successfully");
// }
// catch(err){
//     res.status(500).send("Error signing up user"+err.message);
// }

// here req has so many other things also along with body
// console.log("Request Body:", req);

//it will give undefined because by default express doesnt know how to parse the json data coming from client
//to make express understand that we are sending json data from client we need to use middleware
// that middleware is express.json()
// we need to use this middleware before defining any route which is going to accept json data from client
// so that middleware will parse the json data and put it in req.body
// after using that middleware we can access the json data in req.body

//this middleware will parse the incoming json data and put it in req.body
//this middleware introduced in express version 4.16.0 and above
//this middleware is used to parse the incoming request body in json format for all the routes
//middleware is a function which has access to request and response objects
// its males developers life easy by parsing the json data automatically

// console.log("Request Body:", req.body);


// });

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
connectDB().then(()=>{ 
    console.log("DB connected successfully");
    app.listen(3000,()=>{
    console.log("server successfully listening to 3000");
});
}).catch((err)=>{
    console.log("DB connection failed",err);
});

//  app.listen(3000,()=>{
//     console.log("server successfully listening to 3000");
// });