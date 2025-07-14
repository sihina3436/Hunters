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
    const user = new User({ username, email, password });
    await user.save();
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
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password does not match" });
    }

    const token = await generateToken(user._id);

    // Set cookie (you can adjust this for production environment)
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
        profileImage: user.profileImage,
        bio: user.bio,
        profession: user.profession,
        address: user.address,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Logout User
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
});

// Delete User
router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
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

// Get All Users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, 'id email role username address').sort({ createdAt: -1 });
    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update User Role
router.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(id, { role }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User role updated successfully", user });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ message: "Error updating user role" });
  }
});

// Edit or Update Profile (with address support)
router.patch("/edit-profile", async (req, res) => {
  try {
    const {
      userId,
      username,
      profileImage,
      bio,
      profession,
      address,
    } = req.body;

    if (!userId) {
      return res.status(403).json({ message: "User ID is required" });
    }

    const updateFields = {
      username,
      profileImage,
      bio,
      profession,
    };

    // If address is provided, update it
    if (address) {
      updateFields.address = {
        street: address.street || '',
        city: address.city || '',
        state: address.state || '',
        postalCode: address.postalCode || '',
        country: address.country || ''
      };
    }

    const user = await User.findByIdAndUpdate(userId, updateFields, { new: true });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User profile updated successfully", user });
    console.log("User profile updated successfully", user);
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Error updating user profile" });
    console.log("Updating user profile with:", req.body);
  }
});

// Get User by Email
router.get("/user-by-email/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage,
      bio: user.bio,
      profession: user.profession,
      address: user.address,
    });
  } catch (error) {
    console.error("Error fetching user by email:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
