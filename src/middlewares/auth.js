 const adminAuth=app.use("/admin",(req,res,next)=>{
    //logic to check if the request is from authorized user
    //doing this again again for every api is difficult, so we can use middleware for this
    // here the route which are coming with /admin only will go through this middleware
    // so all admin related routes should be with /admin at start
    const token="xyz";
    const isAdminAuthrized=token==="xyz";
    if(!isAdminAuthrized){
            res.status(401).send("unauthorized access");
        }else{
            next();
        }
});


 const userAuth=app.use("/admin",(req,res,next)=>{
    //logic to check if the request is from authorized user
    //doing this again again for every api is difficult, so we can use middleware for this
    // here the route which are coming with /admin only will go through this middleware
    // so all admin related routes should be with /admin at start
    const token="xyz";
    const isAdminAuthrized=token==="xyz";
    if(!isAdminAuthrized){
            res.status(401).send("unauthorized access");
        }else{
            next();
        }
});
module.exports={adminAuth,userAuth};