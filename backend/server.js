const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
require("dotenv").config();


const app = express();
const PORT = process.env.PORT || 3000;

//body parser
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to Naman-ka-Dhabaa!!!");
});

//import routers
const personRouters = require("./routers/personRouters.js");
const MenuItems = require("./routers/MenuItems.js");

app.use("/person", personRouters);
app.use("/menu", MenuItems);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
