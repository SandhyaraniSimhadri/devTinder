const express = require("express");
const requestRouter = express.Router();
const { userAuthent } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User=require("../models/user");



requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuthent,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;
      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: "invalid status type: " + status,
        });
      }
      //is there is an existing connectionrequest

      //if we have large data in DB, then the queries will become costly, so reduce it we need to use indexes
      //if we use indexes, then APIs become faster

      //here we are queriying using both ids, so we need to have index on both of these, this called as compound index
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId:toUserId, toUserId:fromUserId },
        ],
      });
      if(existingConnectionRequest){
        return res.status(400).json({message:"connection Request already exist"});
      }

      const toUser= await User.findById(toUserId);
      if(!toUser){
        return res.status(404).json({message:"user not found"});
      }
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionRequest.save();

      res.json({
        message:res.user.firstName+" is "+status+" in "+toUser.firstName,
        data,
      });
    } catch (err) {
      res.status(400).send("error " + err.message);
    }
  }
);


requestRouter.post("/request/review/:status/:requestId",userAuthent,async (req,res)=>{
try{
  const loggedUser=req.user;
  const {status, requestId}= req.params;
  //status should be accepted/rejected
  const allowedStatus = ["accepted","rejected"];
  if(!allowedStatus.includes(status)){
    return res.status(400).json({message:"status not allowed"});
  }

  const connectionRequest = await ConnectionRequest.findOne({
    _id:requestId,
    toUserId:loggedUser._id,
    status:"interested",
  });
  if(!connectionRequest){
    return res.status(404).json({message:"connection request not found"});
  }
    connectionRequest.status = status;
    const data = await connectionRequest.save();
    res.json({message:"connection request "+status,data});


  
  //logged user should accepet= that is toUserId
  // need to accept/reject only when status is interested
  //request Id should be valid

}
catch(err){
  res.status(400).send("error: "+err.message);
}
})
module.exports = requestRouter;
