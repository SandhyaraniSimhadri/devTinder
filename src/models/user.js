const mongoose=require('mongoose');
const validator=require('validator');
const userSchema=new mongoose.Schema({ 
    //use camel case for naming the fields   
    //to make mandatory field we can use required:true  
    //if required:true fields are not provided while creating document, it will give validation error and mongo dont do the insert operation
    firstName:{type:String, required:true,minLength:4,maxLength:50},
    lastName:{type:String},
    //adding unique:true to emailId to make it unique
    // if we try to insert duplicate emailId it will give error
    // but this is not a validation, its an index, so its better to handle this in application logic
    //adding lowercase:true will make the emailId to lowercase before saving to database
    //trim:true will remove the extra spaces before and after the emailId
    //email id should have pattren
    // to add those we can take help from external libraries also
    // here validator NPM libtary is used to validate the email pattern
    emailId:{type:String, required:true, unique:true,lowercase:true,trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email id");
            }   
        }
    },

    password:{type:String, required:true,
         validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is not strong enough");
            }   
        }
    },
    //for string type, we need minLength and maxLength
    //for number type, we need min and max
    age:{type:Number,min:18,max:120},

    //adding custom validate function to gender field
    //this cusomt validate functions works as synchronous validator and throws error if validation fails
    // after adding this validate function, if we try to insert any value other than male, female, other it will give validation error      
    // it will check as array includes method to check whether the value is in the array or not
    // first it will go through the built in validators like required, minLength, maxLength etc
    // if those validators are passed then it will go to custom validate function
    //be default this valdate function only called when we are creating new document
    // if we want to call this validate function while updating also, we need to pass runValidators:true in the options object while updating
    gender:{type:String,
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("Gender must be male, female or other");
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://www.example.com/default-photo.jpg",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid URL");
            }   
        }
    },
    about:{
        type:String,
        default:"Hey there! I am using DevTinder."
    },
    skills:{
        //is this an array of strings missed, then mogos will add empty array as default value
        type:[String], //array of strings
    }
    //to store the timestamp when the use is created and updated automatically, we need to pass timestamps:true in the schema options object
    // mongoose will create two fields createdAt and updatedAt automatically and will update them accordingly
    // we no need to define those fields in the schema explicitly
},{
    timestamps:true
});

// after creating schema we need to create mongoose model
//model name should be singular and first letter should be capitalized because its like a class


// const User=mongoose.model("User",userSchema);

// we can write like this also directly

//schema and model difference is schema is structure of document and model is used to perform operations on that document and collection, and other difference is schema is created using mongoose.schema and model is created using mongoose.model
// and difference in functionality is schema defines the structure of document and model provides interface to database for CRUD operations

//schema means structure of document, where as model is a class with which we construct documents. In mongoose, each document will be an instance of a model. Models are responsible for creating and reading documents from the underlying MongoDB database.
module.exports=mongoose.model("User",userSchema);