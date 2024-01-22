const express = require ("express");
const mongoose = require("mongoose");
const app = express();

const port = 3000 

// User.js
const User = require("./model/user")

app.set("view engine","ejs")
app.use(express.urlencoded({extended:true})) // middleware for load and unload the url and extended for encode data

//to connect database and express
mongoose.connect('mongodb://127.0.0.1:27017/test')
.then(()=>{
    console.log("Database connection done")
}).catch(()=>{
    console.log("connection unsucessful")
})



// to render html page or ejs page
app.get("/",(req,res)=>{
    res.render("index");
})

// to send the data to database
// app.post("/",(req,res)=>{
//     const user = req.body;
//     console.log(req.body);
// })

app.post("/datatyit",async (req,res)=>{
    const data = new User(req.body);//from html page to send the data to the database we need to write req.body(server)
    await data.save()
    res.send("Save Data")
})

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`);
})