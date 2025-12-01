const express = require("express");
const requestRouter= express.Router();
const { userAuthent } = require("../middlewares/auth");


requestRouter.post("/sendConnectionRequest",userAuthent ,async (req,res)=>{
//sending a connection request
const user=req.user;
console.log("sending a connecction request");
res.send(user.firstName+"connection request sent");
});

module.exports=requestRouter;