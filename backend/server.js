console.log("ZeroZCloths");
require("dotenv").config();
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require("mongoose");
const User = require('./Models/user');


const PORT = process.env.PORT;
const monogourl = process.env.uri


app.use(cors())
app.use(express.json());


app.post("/signup", async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        contactNo,
        password
    } = req.body;



    if (!firstName || !lastName || !email || !password || !contactNo) {
        res.json("Please fill all fields...")
    } else if (!firstName) {
        res.json("First name must contain only letters.");
    } else if (!lastName) {
        res.json("Last name must contain only letters.");
    } else if (!contactNo) {
        res.json("check your contact number,only numbers can be aded");
    } else if (!password) {
        res.json("Check At least one lette,one number,one special character and Minimum 8 character");
    } else {

        try {
            console.log(firstName)
            // check if user already exists
            const user = await User.findOne({ email });
            if (user) return res.status(400).json({ message: "User already exists" });


            const newUser = new User({firstName, lastName,email,contactNo,password});

            await newUser.save();
            res.status(201).json({ message: "User registered successfully", user: newUser });
        }
        catch (err) {
            console.error(err);
            res.status(500).send("Server Error");
        }
    }
})


app.post("/signin", async (req, res) => {
    const { email, password } = req.body;
   
    


})




app.listen(PORT, async () => {
    try {
        await mongoose.connect(monogourl);
        console.log("Connected to MongoDB");
    } catch (e) {
        console.error(e);
    }

});