const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: [true,'fullName is required.']
    },
    email:{
        type: String,
        required:[true,'Email is required.'],
        
    },
    password:{
        type: String,
        required:[true,'password is required.']
    }
}, {timestamps: true});

const userModel = mongoose.model("User",userSchema);


module.exports = userModel;