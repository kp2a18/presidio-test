const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');


const app=express();
app.use(cors());
app.use(express.json());
const port = 8081;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
})


app.post('/signup', (req, res) => {
    const sql="INSERT INTO login(`firstname`, `lastname`, `email`,`password`,`phonenumber`,`role`) VALUES (?)";
    const values = [
        req.body.firstname,
        req.body.lasttname,
        req.body.email,
        req.body.password,
        req.body.phonenumber,
        req.body.role
    ]
    db.query(sql,[values], (err,data) => {
        if(err){
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.post('/login', (req, res) => {
    const sql="SELECT * FROM login WHERE `email` = ? AND `password` = ?";
    db.query(sql,[req.body.email,req.body.password], (err,data) => {
        if(err){
            return res.json("Error");
        }
        if(data.length > 0){
            return res.json("success");
        } else {
            return res.json("Failed")
        }
    })
})



app.listen(port, () =>{
     console.log(`Backend server running at http://localhost:${port}`);
})