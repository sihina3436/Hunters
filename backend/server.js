console.log("ZeroZCloths");

const express = require('express')
const app = express()
const cors = require('cors')

const PORT=3000;

app.use(cors())
app.use(express.json());

app.post("/signup",async(req , res)=>{

    const{
        firstName,
        lastName,
        email,
        password,
        rePassword,
        contactNo,
    }=req.body;

    

    if(!firstName || !lastName || !email || !password || !rePassword || !contactNo){
        res.json("Please fill all fields...")
    }else if(!firstName){
        res.json("First name must contain only letters.");
    }else if(!lastName){
        res.json("Last name must contain only letters.");
    }else if(!contactNo){
        res.json("check your contact number,only numbers can be aded");
    }else if(!password){
        res.json("Check At least one lette,one number,one special character and Minimum 8 character");
    }else if(password !== rePassword){
        res.json("Passwors are not match");
    }else{
        console.log(firstName)
        // res.json("success");
    }

})


app.post("/signin",async(req , res)=>{
    const{email,password}=req.body;
    if(!email || !password){
        res.json("Not Match email password")
    }else {

    }

    
})

app.listen(3000,async () => {
    
   
});