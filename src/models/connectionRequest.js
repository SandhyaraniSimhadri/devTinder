const mongoose = require("mongoose");
const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        //to make the r/s between fromUserId and user collection
        ref:"User",
        required:true
    },
     toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true

    },
     status:{
        type:String,
        required:true,
        enum:{values:["ignored", "interested", "accepted", "rejected"],
            message:`{VALUE} is incorrect status type`
        }
    }
},{
    timestamps:true
});

//creating index
//ConnectionRequest.find({fromUserId:1231231321313231}) this query will be very fast
// connectionRequestSchema.index({fromUserId:1});


//if we have ConnectionRequest.find({fromUserId:1231231321313231,toUserId:erwqreqreqrqwrq}) then we need to use compound index
//here 1 is ascending, -1 is descending etc, there are 2d, 2dsphere also there
connectionRequestSchema.index({fromUserId:1,toUserId:1});

//this is like a middileware , it will be called everytime whenever the connection request is save.. that is .save();

//we can do this check in api also, to learn pre, we did here
connectionRequestSchema.pre("save",function(next){
    const connectionRequest = this;
    //check if the fromuserid is same as touserid
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("you cannot send connection request to yourself");
    }
next();
})


const ConnectionRequestModel = new mongoose.model("ConnectionRequest",connectionRequestSchema);

module.exports = ConnectionRequestModel;