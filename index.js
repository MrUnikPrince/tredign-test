const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const port = process.env.PORT || 8000;
const app = express();



//database
const dbUri = process.env.DB_URI;
mongoose.connect(dbUri, {useNewUrlParser: true, useUnifiedTopology:true,})
.then(() =>{
    console.log('Connected to the database ');
}) 
.catch((err) => {
    console.log("error in connecting to the database ");
})


// ejs and middle ware
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

// routes
app.use('/', require('./routes'))
// Sever 
app.listen(port, (err) => {
    if(err){console.log(`Error in running server`);}
    console.log(`Server is running on Port: ${port}`);
})