const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'fullName is required.']
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true
    },
    password: {
        type: String,
        required: false // Set to false to make it optional
    }
}, { timestamps: true });
userSchema.set('toJSON', {
    transform: (doc, ret) => {
      delete ret.__v;
      return ret;
    }
  });


const userModel = mongoose.model("User",userSchema);

module.exports = userModel;