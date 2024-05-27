const express = require("express");
const mysql = require('mysql');
const cors = require('cors');

const app=express();
app.use(cors());
app.use(express.json());
const port = 8081;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "property"
})

app.post('/propertform', (req, res) => {
    const sql="INSERT INTO login(`title`, `address`, `area`,`bedrooms`,`bathrooms`,`description`,`nearbyhospitals`,nearbycollege`,`contact`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.address,
        req.body.area,
        req.body.bedrooms,
        req.body.bathrooms,
        req.body.description,
        req.body.nearbyhospitals,
        req.body.nearbycollege,
        req.body.contacts
    ]
    db.query(sql,[values], (err,data) => {
        if(err){
            return res.json("Error");
        }
        return res.json(data);
    })
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


exports.getAllProperties = async (req, res) => {
    const { title, address, area, bedrooms, bathrooms, price, nearbyHospitals, nearbyColleges } = req.query;
    let filter = {};

    if (title) filter.title = { $regex: title, $options: 'i' };
    if (address) filter.address = { $regex: address, $options: 'i' };
    if (area) filter.area = area;
    if (bedrooms) filter.bedrooms = bedrooms;
    if (bathrooms) filter.bathrooms = bathrooms;
    if (price) filter.price = price;
    if (nearbyHospitals) filter.nearbyHospitals = { $regex: nearbyHospitals, $options: 'i' };
    if (nearbyColleges) filter.nearbyColleges = { $regex: nearbyColleges, $options: 'i' };

    try {
        const properties = await Property.find(filter);
        res.json(properties);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
app.listen(port, () =>{
     console.log(`Backend server running at http://localhost:${port}`);
})