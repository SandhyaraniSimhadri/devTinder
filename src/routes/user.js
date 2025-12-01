const express = require("express");
const { userAuthent } = require("../middlewares/auth");
const userRouter = express.Router();
const ConnectionRequest= require("../models/connectionRequest")

const USER_SAFE_DATA =   "firstName lastName age photoUrl skills about";
//get all the pending connection requests for the loggedIn user 
userRouter.get("/user/requests/received", userAuthent, async (req,res)=>{
    try{
        const loggedUser=req.user;
        //get all the connection requests of the logged user
        const connectionRequest = await ConnectionRequest.find({
            toUserId:loggedUser._id, 
            status:"interested" 
        }).
        populate("fromUserId","firstName lastName age photoUrl skills about");
            //if we dont add firstName and lastName etc, then it will give all the fields which are in user Collection including sensitive info like mail, password etc, so carefull about these fields

         //otherway is
        // populate("fromUserId",["firstName","lastName"]);
       
       
        //to get the names, we need to make relation between 2 tables, ref is used for that r/s
        res.json({message:"data fetched successfully",data:connectionRequest})
    }
    catch(err){
        res.status(400).json({message:"error "+err.message})
    }
})


userRouter.get("/user/connections",userAuthent,async (req,res)=>{
    try{
        const loggedUser = req.user;
        // data of connection, logged user can be fromUserId or toUserId and status should be accepted

        const connectionRequests = await ConnectionRequest.find({
            $or:[
                {toUserId:loggedUser._id,status:"accepted"},
                {fromUserId:loggedUser._id,status:"accepted"}
            ]
        }).populate("fromUserId",USER_SAFE_DATA).populate("toUserId",USER_SAFE_DATA); 
        //we dont need extra info
        const data = connectionRequests.map((row)=>
            {
                //here doing string comparison becuase we cant compare two mongo objects directly
                if(row.fromUserId._id.toString() === loggedUser._id.toString())
                {
                  return  row.toUserId
                }else{
                return row.fromUserId}
            }
            );
        res.json({message:"Connections list",data:data})

    }catch(err){
        res.status(400).send({message:err.message})
    }
})
module.exports = userRouter;   