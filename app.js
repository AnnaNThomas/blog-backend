const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt=require("bcryptjs")
const { usermodel } = require("./models/blog")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://annant2003:annant2003anna@cluster0.ncbl8ds.mongodb.net/blogdb?retryWrites=true&w=majority&appName=Cluster0")

//generate generateHashedpassword arrow function
//making this function to asynchronous function
const generateHashedpassword= async(password)=>{
    const salt=await bcrypt.genSalt(10)            //salt value is cost factor  value
    return bcrypt.hash(password,salt)             //encrypt function

}

app.post("/signUp",async(req,res)=>{

    let input =req.body
    let hashedpassword= await generateHashedpassword(input.password)  
    console.log(hashedpassword)
    input.password=hashedpassword 

    let blog = new usermodel(input)
    blog.save()
    res.json({ "status": "success" })
})

// let input = req.body
//let employee = new employeemodel(input)

app.listen(8080,()=>{
    console.log("server started")
})