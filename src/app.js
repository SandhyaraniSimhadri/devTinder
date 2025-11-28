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
// app.get("/user",(req,res)=>{
//     res.send({firstName:"sandhya", lastName:"rani"})
// })
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
// app.get("/user",(req,res)=>{
//     console.log(req.query);// this will give all the query params which are passed through url
//     res.send({firstName:"sandhya", lastName:"rani"})
// })


//how to access query params which are passed through url /user/10 --- dynamic apis
//":" means dynamic route
// app.get("/user/:userId",(req,res)=>{
//     console.log(req.params);// this will give all the query params which are passed through url /user/10 --- dynamic apis
//     res.send({firstName:"sandhya", lastName:"rani"})
// })


// app.get("/user/:userId/:password/:classId",(req,res)=>{
//     console.log(req.params);// this will give all the query params which are passed through url /user/10 --- dynamic apis
//     res.send({firstName:"sandhya", lastName:"rani"})
// })



app.use("/user",(req,res)=>{
    //route handler
    // res.send("Route handler 1");

    // if we don't send any thing from the server as a response, then incmoing request will wait till the timeout timer
    // after TOT, that request will be cancelled.. this all is like going into loop
    // so we have to send response back
}) 
// there can be multiple handlers in a single route handler
//response will be 'response' because request will go to first route handler 
//if we don't have res.send in first route handler, then response will be like loop again, request will be hang
// how to go to second route handler.... for that we need to call next().. then output will be 'response 1'
app.use("/user",(req,res,next)=>{
    // res.send("response");
    next();
},(req,res)=>{
     res.send("response 1");
})


//response will be 'route','response','route 1' and an error message like cannot set headers after they are send to client
//because code after res.send("response"); also will get called, so when you call next() , it will go to next route handler
//so 'route 1' will be printed, then code will through error when code tried to send response again as res.send("response 1");
 
// app.use("/user",(req,res,next)=>{
//     console.log("route");
//     res.send("response");
//     next();
// },(req,res)=>{
//         console.log("route 1");
//      res.send("response 1");
// })


//response will be 'response 1' and error cannot set headers after they are sent to client because
//     res.send("response"); will be called again
// app.use("/user",(req,res,next)=>{
//     console.log("route");
//     next();
//     res.send("response");
// },(req,res)=>{
//         console.log("route 1");
//      res.send("response 1");
// })


//response - response 1, without error becuase we dont have next() in route 1

// app.use("/user",(req,res,next)=>{
//     console.log("route");
//     next();
// },(req,res)=>{
//         console.log("route 1");
//      res.send("response 1");
// },(req,res)=>{
//         console.log("route 2");
//      res.send("response 2");
// },(req,res)=>{
//         console.log("route 3");
//      res.send("response 3");
// },(req,res)=>{
//         console.log("route 4");
//      res.send("response 4");
// })



// here it will give 'cannot GET /user' issue but all consoles will work , 
// becuase it goes on checking after next but not found response in route handler
// if we dont have next() at last handler, then it will goto loop
// app.use("/user",(req,res,next)=>{
//     console.log("route");
//     next();
// },(req,res,next)=>{
//         console.log("route 1");
//     next();
// },(req,res,next)=>{
//         console.log("route 2");
//     next();
// },(req,res,next)=>{
//         console.log("route 3");
//      next();
// },(req,res,next)=>{
//         console.log("route 4"); 
//         next();
// })


//we can send as array of functions 
// app.use("/user",[(req,res,next)=>{
//     console.log("route");
//     next();
// },(req,res)=>{
//         console.log("route 1");
//      res.send("response 1");
// },(req,res)=>{
//         console.log("route 2");
//      res.send("response 2");
// },(req,res)=>{
//         console.log("route 3");
//      res.send("response 3");
// },(req,res)=>{
//         console.log("route 4");
//      res.send("response 4");
// }])



//we can have sub array also,, no issue.. it will work as same above.. wrapping routes inside array won't change anything
app.use("/user",[(req,res,next)=>{
    console.log("route");
    next();
},(req,res)=>{
        console.log("route 1");
     res.send("response 1");
}],(req,res)=>{
        console.log("route 2");
     res.send("response 2");
},(req,res)=>{
        console.log("route 3");
     res.send("response 3");
},(req,res)=>{
        console.log("route 4");
     res.send("response 4");
})
app.listen(3000,()=>{
    console.log("server successfully listening to 3000");
});