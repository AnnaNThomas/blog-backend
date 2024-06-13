const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcryptjs")
const { usermodel } = require("./models/blog")
const jwt = require("jsonwebtoken")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://annant2003:annant2003anna@cluster0.ncbl8ds.mongodb.net/blogdb?retryWrites=true&w=majority&appName=Cluster0")

//generate generateHashedpassword arrow function
//making this function to asynchronous function
const generateHashedpassword = async (password) => {
    const salt = await bcrypt.genSalt(10)            //salt value is cost factor  value
    return bcrypt.hash(password, salt)             //encrypt function

}

app.post("/signUp", async (req, res) => {

    let input = req.body
    let hashedpassword = await generateHashedpassword(input.password)
    console.log(hashedpassword)
    input.password = hashedpassword

    let blog = new usermodel(input)
    blog.save()
    res.json({ "status": "success" })
})


//api for signIn

app.post("/signIn", (req, res) => {
    let input = req.body
    usermodel.find({ "emailid": req.body.emailid }).then(
        (response) => {
            if (response.length > 0) {
                let dbpassword = response[0].password
                console.log(dbpassword)

                bcrypt.compare(input.password, dbpassword, (error, isMatch) => {             //password comparing
                    if (isMatch) {
                        //if login success generate token
                        jwt.sign({ email: input.emailid }, "blog-app", { expiresIn: "1d" },       //blog-app is token name
                            (error, token) => {                         
                                if (error) {
                                    res.json({ "status": "unable to create token" })
                                } else {
                                    res.json({ "status": "success", "userid": response[0]._id, "token": token })
                                }
                            }
                        )

                    } else {
                        res.json({ "status": "Incorrect" })
                    }

                })




            } else {
                res.json({ "status": "user not found" })
            }


        }
    ).catch()
})

// let input = req.body
//let employee = new employeemodel(input)

app.listen(8080, () => {
    console.log("server started")
})