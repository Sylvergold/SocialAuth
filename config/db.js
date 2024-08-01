require("dotenv").config();
const mongoose = require("mongoose");
const URL = process.env.DATABASE;

mongoose.connect(URL)
.then(()=>{
    console.log(`Database connected successfully.`)
})
.catch((error)=>{
    console.log(`Error connecting to database.`, error)
}); 