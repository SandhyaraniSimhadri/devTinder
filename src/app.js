const express = require("express");
const app = express(); //instance of express

//this is called as request handler
// here for all requests, its giving hello from server
// app.use((req,res)=>{
//     res.send("Hello from server");
// })
//to respond differently to different rquestes, we need to use routes

// order of routes are very important becuase code execution happens from top to bottom
// if we put / at start, then all routes with / will be passed
// server responds to /test route only
// app.use("/test", (req,res)=>{
//     res.send("Hello from server");
// })

//here anything with /hello will be passed, like /hello/1 etc, but /hello12 wont pass
// app.use("/hello", (req,res)=>{
//     res.send("Hello hello");
// })
//anything that start with / will go this handler, thats why we should not put at start, becuase all things 
// which match to start with / will be passed.
// app.use("/", (req,res)=>{
//     res.send("Hello from dashboard HELLOO");
// })
//app.use("/test") will match all the HTTP method API calls to /test
//this is only handle GET call to /user
app.get("/user",(req,res)=>{
    res.send({firstName:"sandhya", lastName:"rani"})
})
// for every call POST< GET or any other, it will give data saved. so here also order of routes imp

// app.use("/user",(req,res)=>{
//    res.end("data saved");
// })


// app.post("/user",(req,res)=>{
//    res.end("data saved");
// })

// app.delete("/user",(req,res)=>{
//    res.end("data deleted");
// })


// it will work for ac, abc
// app.get("/ab?c",(req,res)=>{
//     res.send({firstName:"sandhya", lastName:"rani"})
// })

//bd is optional
// app.get("/a(bc)?d",(req,res)=>{
//     res.send({firstName:"sandhya", lastName:"rani"})
// })
// it will work for abc, abbbbc, means any number of b's.. these are like regular expressions
// app.get("/ab+c",(req,res)=>{
//     res.send({firstName:"sandhya", lastName:"rani"})
// })


// ab and anything in between and cd at last
// app.get("/ab*cd",(req,res)=>{
//     res.send({firstName:"sandhya", lastName:"rani"})
// })

//path contains 'a' letter will work
// app.get("/a/",(req,res)=>{
//     res.send({firstName:"sandhya", lastName:"rani"})
// })

// start with anything, have fly at end
// app.get("/.*fly$/",(req,res)=>{
//     res.send({firstName:"sandhya", lastName:"rani"})
// })

//how to access query params which are passed through url /user?userId=10
app.get("/user",(req,res)=>{
    console.log(req.query);// this will give all the query params which are passed through url
    res.send({firstName:"sandhya", lastName:"rani"})
})


//how to access query params which are passed through url /user/10 --- dynamic apis
//":" means dynamic route
app.get("/user/:userId",(req,res)=>{
    console.log(req.params);// this will give all the query params which are passed through url /user/10 --- dynamic apis
    res.send({firstName:"sandhya", lastName:"rani"})
})


app.get("/user/:userId/:password/:classId",(req,res)=>{
    console.log(req.params);// this will give all the query params which are passed through url /user/10 --- dynamic apis
    res.send({firstName:"sandhya", lastName:"rani"})
})


app.listen(3000,()=>{
    console.log("server successfully listening to 3000");
});