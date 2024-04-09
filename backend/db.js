const mongoose = require("mongoose");
require("dotenv").config();

//define url
const URL = process.env.URL_cloud;

//setup connect
mongoose.connect(URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection
    .on("connected",()=> console.log("DB connected"))
    .on("disconnected",()=>console.log("DB disconnected"))
    .on("error",()=> console.log("Internal Server Error"));

module.exports = { db };