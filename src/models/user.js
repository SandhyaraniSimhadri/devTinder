const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({ 
    //use camel case for naming the fields     
    firstName:{type:String},
    lastName:{type:String},
    emailId:{type:String},
    password:{type:String},
    age:{type:Number},
    gender:{type:String}
});

// after creating schema we need to create mongoose model
//model name should be singular and first letter should be capitalized because its like a class


// const User=mongoose.model("User",userSchema);

// we can write like this also directly

//schema and model difference is schema is structure of document and model is used to perform operations on that document and collection, and other difference is schema is created using mongoose.schema and model is created using mongoose.model
// and difference in functionality is schema defines the structure of document and model provides interface to database for CRUD operations

//schema means structure of document, where as model is a class with which we construct documents. In mongoose, each document will be an instance of a model. Models are responsible for creating and reading documents from the underlying MongoDB database.
module.exports=mongoose.model("User",userSchema);