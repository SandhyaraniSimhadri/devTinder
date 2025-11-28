const express = require("express");
const app = express(); //instance of express

//this is called as request handler
// here for all requests, its giving hello from server
// app.use((req,res)=>{
//     res.send("Hello from server");
// })
//to respond differently to different rquestes, we need to use routes
// server responds to /test route only
app.use("/test", (req,res)=>{
    res.send("Hello from server");
})


app.use("/hello", (req,res)=>{
    res.send("Hello hello");
})
app.use("/", (req,res)=>{
    res.send("Hello from dashboard HELLOO");
})
app.listen(3000,()=>{
    console.log("server successfully listening to 3000");
});