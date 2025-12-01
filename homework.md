- create a repo
- initialise the repo
- difference between node_modules, package.json, package-lock.json and know about them
- install express
- create server
- Listen to port number 7777
- write request handlers for /test, /hello
- install nodemon and update scripts inside package.json
- difference between caret and tilde (^ vs ~)
- what are dependencies
- what is the use of "-g" while npm install


- initialize git repository
- .gitignore
- create a remote repo on github
- push all code to remote origin
- play with routes and route extentions.. ex /hello , / , /hello/2 etc
- order of the routes matter a lot 
- install postman app and make  workspace and collection > test apis
- write logic to handle GET, POST, PATCH, DELETE etc , and test them on postman
- explore routing and use of ?, +, (), * in the routes
- use of regex in routes /a/, /.*fly$
- how to read query params in routes 
- reading the dynamic routes

- multiple routes handlers - play with code
- next()
- next function and errors along with res.send()
- app.use("/user" array wrapped routes);
- what is middleware and why we need it
- how express JS basically handles requests behind the scenes
- difference between app.use and app.all
- write a dummy auth middleware for all user routes, except /user/login
- error handling using app.use.use('/',(err,req,res,next))


- create a free cluster in mongodb website --- mongo atlas
- install mongoose library
- connect application to the cluster-> db ---- use connection URL
- call the connectDB connection and connect DB before starting listening on port for incoming requests
- create a user schema and usermodel
- create /signup post api to add data to DB
- push some docs using API calls from postman
- error handling using try, catch


- difference between Javascript object and JSON object
- add the express.json middlware to your app
- make your signup api dynamic to receive data from the end user
- user.findOne with duplicate email ids, which object it will return
- create API- get user by email
- create API - GET/feed - to get all the users from DB
- API - try findById
- create a delete user API
- difference between patch and put
- findByIdAndUpdate and findOneAndUpdate difference
- create api to Update a user
- explore the mongoose document especially the Model methods
- what are options in a model.findOneAndUpdate
- create API which update the user with emailid
- Explore schematype options from the documentation
- add required, unique, lowercase, min,max, minlength,maxlength
- Add default value
- create a custom validate function for gender 
-improve the DB schema - put all appropriate validations on each field in schema
- add timestamps to the userSchema
- add API level validation on Patch request and signup post API
- add API validation for each field--- this all is Data sanitization
- install validator
- explore validator library functions ans use validator functions for password, email, photoURL
- NEVER TRUST req.body
- Validate data in signup API and write common util function for that
- install bcrypt package
- create passwordHash using bcrypt.hash and save the user with encrupted password
- create login API, write logic by own
- compare passwords and throw errors it email or password is invalid


-install cookie-parser
-just send a dummy cookie to user
-create GET /profile API and cieck if you get the cookie
- install jsonwebtoken
- in login api, after email and password validation , create jwt token and send it to user in cookie
- read the cookies inside your profile API and find the logginng in user
- userAuthent middleware
- Add the userAuthent middle in profile API and new sendConnectionRequest API
- set the expiry of JWT token and cookies to 7 days
- create userSchema method to getJWT()
- create Userschema method to comparepassword(passwordInputByUser)


- Explore tinder APIs
- Create a list of all APIs you can think of in DEVTINDER
- group multiple routes under respective routers

- explore /read documentation for express.Router()
- create routes folder for managing auth, profile, request routers
- create authRouter, profileRouter, requestRouter
- import these routers in app.js
- create POST /logout API
- create PATCH /profile/edit
- create PATCH /profile/password API =>forgot password API
- Make you validate all data in every POST, PATCH, APIs





- create connection request schema
- send connection request API
- proper validation of data
- think about all corner cases
- $or query and $and query in mongodb,, read about all logical querries operators 
- schema.pre("save") function 
- read more about mongodb indexes
- why do we need index in DB?
- what is the advantages and disadvantages of creating?
- read this artcile about compound indexes in mongose
- if ew create indexes on each and every things/field, it will cause unnecessaru issues.. learn about these ... 
- ALWAYS think about corner cases

-write code with proper validations for /request/review/:status/:requestId

- Thought process - POST vs GET .. for post, user can post any thing (data), so validation is needed, ... for get, user can try to take the data from DB, so we need to send only allowed data, and user should be autherozied, verified etc

- read about ref and populate
- create GET /user/requests/received witl all corner checks
- create GET API /user/connections