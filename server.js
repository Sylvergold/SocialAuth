require ("dotenv").config();
const express = require("express");
const database = require("./config/database");
const router = require("./router/router");

const app = express();
app.use(express.json());

app.use("/api/v1/",router);

const Port = process.env.PORT || 1853
app.listen(Port,()=>{
    console.log(`server is  up listening to PORT: ${Port}.`)
}) 
