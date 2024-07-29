const userModel = require("../models/userModel");

exports.createUser = async (req,res)=>{
    try {
        const createdUser = await userModel.create(req.body);

        return res.status(200).json({
            message:`New user created successfully.`,
            data: createdUser
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}