const express = require("express");
require("./database/config.js");
const cors = require("cors")
const users = require("./database/user.js");
const contact = require("./database/contacts.js")
const products = require("./database/products.js");
const Jwt = require("jsonwebtoken");


const jwtKey = "secureKey";

const app = express();
app.use(cors());

app.use(express.json());
const port = process.env.PORT || 5400;

app.post("/register", async (req, res) => {
    const { password, mobile, name } = req.body;


    if (name && mobile && password) {
        try {
            const existingUser = await users.findOne({ mobile });

            if (existingUser) {
                return res.send({ result: "User already exists" });
            }

            const newUser = new users(req.body);
            const savedUser = await newUser.save();

            return res.send({ result: "Register sucessfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ result: "Internal Server Error" });
        }
    } else {
        return res.send({ result: "Enter valid details." });
    }
});




app.post("/login", async (req, res) => {
    const { name, password } = req.body;


    if (name && password) {
        try {
            const result = await users.findOne({ name, password });

            if (result) {

                Jwt.sign({ users }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                    if (err) {
                        res.send("Something went wrong please try again");
                    } else {
                        res.send({ results: "Login Success", token, "userReasult": result });
                    }

                })

                // res.send({ results: "Login Success" });
            } else {
                res.send({ results: "Invalid details" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ results: "Internal Server Error" });
        }
    } else {
        res.send({ results: "Please enter valid details" });
    }
});






app.get("/getproducts", async (req, res) => {
    try {

        console.log(req.body)
        const productList = await products.find();
        res.send(productList);
    } catch (error) {
        console.error(error);
        res.status(500).send({ result: "Internal Server Error" });
    }
});


app.post("/contact", async (req, res) => {

    try {
        const { name, message, email, mobile } = req.body;
        if (name && message && email && mobile) {
            const contacts = new contact(req.body);
            const result = await contacts.save();
            res.send({ "result": "message sent Sucess" });
        } else {
            res.send({ "result": "please enter valid detail" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ result: "Internal Server Error" });
    }
});



app.get("/profile",async(req,res)=>{
   const {token , user } = req.query;
   if(token && user ){
    Jwt.verify(token, jwtKey, async(error, valid) => {
        if (error) {
            res.send({ result: "Please send token with header" })
        } else {
            const userdetails=await users.findOne({name:user})
            console.log(userdetails)
            res.send(userdetails)
            
        }
    })
   }
  
})





function verifyToken(req, res, next) {
    // let token = req.headers['authorization'];
    let token  =  req.body.token


    if (token) {

        Jwt.verify(token, jwtKey, (error, valid) => {
            if (error) {
                res.send({ result: "Please send token with header" })
            } else {
                console.log(valid)
                next();
            }
        })


    } else {
        res.send("Please enter valid token");
    }
}









app.listen(port);









