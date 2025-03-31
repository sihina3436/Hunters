console.log("ZeroZCloths");
require("dotenv").config();
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require("mongoose");
const User = require('./Models/user');
const bcrypt = require("bcrypt");


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

    const letterRegex = /^[A-Za-z]+$/;
    const numberRegex = /^\d{10}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;

    if(!firstName || !lastName || !email || !password || !contactNo){
        res.json("Please fill all fields..");
    }else if(!letterRegex.test(firstName)){
        res.json("First name must contain only letters.");
    }else if(!letterRegex.test(lastName)){
        res.json("Last name must contain only letters.");
    }else if(!numberRegex.test(contactNo)){
        res.json("check your contact number,only numbers can be aded");
    }else if(!passwordRegex.test(password)){
        res.json("Check At least one lette,one number,one special character and Minimum 8 character");
    }else{
        // console.log(firstName)
        try {
            console.log(firstName)
            // check  user already exists
            const user = await User.findOne({ email });
            if (user){
                res.json("User already exists");
            } 

            const newUser = new User({ firstName, lastName, email, contactNo, password });
            await newUser.save();
            res.json("User registered successfully");
            
        }
        catch (err) {
            console.error(err);
            
        }
    }
    
})


app.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    // console.log(password)

    if (!email || !password) {
        return res.json("Please enter email and password." );
    }else{
        try {
            const user = await User.findOne({email});
            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch) {
                return res.json("Invalid email or password");
                
            }else{
                console.log("User login successfully.");
                return res.json( "User login successfully.");
            }
        } catch (err) {
            console.error(err);
            res.json("Server error.");
        }
}



})




app.listen(PORT, async () => {
    try {
        await mongoose.connect(monogourl);
        console.log("Connected to MongoDB");
    } catch (e) {
        console.error(e);
    }

});