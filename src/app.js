const express = require("express");
// require("./config/database"); //to connect to database
const app = express(); //instance of express
const connectDB = require("./config/database"); //to connect to database
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
app.use(express.json()); //middleware to parse json data

app.post("/signup", async (req, res) => {
  try {
    //validation of data is required before saving the data into DB

    //to validate we can write util functions or helper functions
    validateSignupData(req);
    const { firstName, lastName, emailId, password } = req.body;
    // encryption of password is required before saving the data into DB
    //salt is random string which is added to the password before hashing
    const passwordHash = await bcrypt.hash(password, 10); //10 is salt rounds,, the more the salt rounds the more secure the password but it will take more time to hash
    //it returns promise so we need to use async await
    console.log("Hashed Password:", passwordHash);
    //this hashed password we need to save into the DB instead of plain password// it cant be decrypted back to original password
    // so while login we need to compare the plain password with hashed password using bcrypt compare method
    // other data remains same
    // create new user object with hashed password
    //   req.body.password=passwordHash; //replace plain password with hashed password
    console.log("Request Body:", req.body);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("user signed up successfully");
  } catch (err) {
    res.status(500).send("Error signing up user  " + err.message);
  }
});


app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;   
    const user = await User.findOne({ emailId: emailId });    
    if (!user) {
      //here we should not show whether user is not found or password is incorrect for security reasons
      // if we do that its called as information leakage
      //if we do this, then attacker may try to find the valid email ids in our application with random email ids
      // so use standard text like invalid credentials for both user not found and invalid password
      return res.status(404).send("Invalid credentials");
    } 
    // it will return boolean
    const isPasswordValid = await bcrypt.compare(password, user.password);    
    if (!isPasswordValid) {
      return res.status(401).send("Invalid credentials");
    }
    res.send("User logged in successfully");
  } catch (err) {
    res.status(500).send("Error logging in user: " + err.message);
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      return res.status(404).send("User not found");
    }
    res.json(users);
    //it will give array of users because find method always returns array
  } catch (err) {
    res.status(500).send("Error fetching user: " + err.message);
  }
});

app.get("/userOne", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.findOne({ emailId: userEmail });
    if (user.length === 0) {
      return res.status(404).send("User not found");
    }
    res.json(user);
    //it will give array of users because find method always returns array
  } catch (err) {
    res.status(500).send("Error fetching user: " + err.message);
  }
});
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({}); //fetch all users from the database
    res.json(users);
  } catch (err) {
    res.status(500).send("Error fetching users: " + err.message);
  }
});
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    //otherway
    //   const user= await User.findByIdAndDelete({_id:userId});

    res.send("User deleted successfully");
  } catch (err) {
    res.status(500).send("Error deleting user: " + err.message);
  }
});
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const updateData = req.body;

  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age"];
    const isUpdateAllowed = Object.keys(updateData).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      res
        .status(400)
        .send(
          "Invalid updates! You can only update photoUrl, about, gender, age."
        );
    }
    if (updateData?.skills.length > 10) {
      throw new Error("You can add maximum 10 skills");
    }
    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });
    //otherway
    //   const user = await User.findByIdAndUpdate({_id: userId}, updateData, { new: true });
    res.json(user);
    //it will return the updated user object
  } catch (err) {
    res.status(500).send("Error updating user: " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("DB connected successfully");
    app.listen(3000, () => {
      console.log("server successfully listening to 3000");
    });
  })
  .catch((err) => {
    console.log("DB connection failed", err);
  });
