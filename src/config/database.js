const mongoose = require('mongoose');
// connect to mongo db cluster using mongoose
// mongoose.connect("mongodb+srv://sandhyasimhadri9999_fullstack:DJgaO0WwzW3se3VX@fullstack.pg0esdz.mongodb.net/");

//good way is to use async await because it returns a promise
const connectDB=async()=>{
   
        await mongoose.connect("mongodb+srv://sandhyasimhadri9999_fullstack:DJgaO0WwzW3se3VX@fullstack.pg0esdz.mongodb.net/devTinder");          
      
}
// connectDB().then(()=>{ 
//     console.log("DB connected successfully");
// }).catch((err)=>{
//     console.log("DB connection failed",err);
// });
module.exports = connectDB; 