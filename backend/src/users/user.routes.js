const express = require("express");
const router = express.Router();
const User = require("./user.model.js");
const generateToken = require("../middleware/GenerateToken.js");
const verifyToken = require("../middleware/verifyToken.js");


// Register User
router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, password } = req.body;
    const user = new User({
      username,
      email,
      password,
    });
    await user.save(); // save in the database
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// Login User
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({email:email});
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).send({ message: "password not match" });
        }
        const token = await generateToken(user._id);

        // set to the cookee
        res.cookie("token", token) ;
        console.log("TOKEN IS : ",token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        });

    res.status(200).send({ message: "Login successful" , token, user :{
       _id : user._id,
       email : user.email,
       username : user.username,
       role : user.role,
       profileImage : user.profileImage,
       bio: user.bio,
       profession : user.profession
    }});
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error" });
    }
  });


//   All users
// router.get("/users",verifyToken, async(req,res) => {
//     res.send({message:"Projected user"})
// });

// logout Endpoint
router.post("/logout",(req,res) =>{
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
});

// delete user
router.delete("/users/:id",async(req,res)=>{
  try {
    const {id} = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
    
  }
});

// get All users
router.get("/users",async(req,res)=>{
  try {
    const users = await User.find({},'id email role').sort({createdAt: -1});
    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).send(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// update user role
router.put("/users/:id",async(req,res)=>{
    try {
      const {id} = req.params;
      const {role} = req.body;
      const user = await User.findByIdAndUpdate(id, {role}, { new: true });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User updated successfully",user });
    } catch (error) {
        console.error("Error occur updating user",error);
        res.status(500).json({ message: "Error Updateing User role" });
      
    }
});

// edit or update profile

router.patch("/edit-profile",async(req,res)=>{
  try {
    const {userId, username, profileImage, bio, profession } = req.body;
    if (!userId) {
      return res.status(403).json({ message: "User Id is Required" });
    }
    const user = await User.findByIdAndUpdate(userId, { username, profileImage, bio, profession }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully",user });
    console.log("User profile updated successfully",user);
  } catch (error) {
    console.error("Error occur updating user profile",error);
    res.status(500).json({ message: "Error Updateing User profile" });
    
  }
});



module.exports = router; 