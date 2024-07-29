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

exports.homePage = async = (req,res)=>{
    try {
        if(!req.isAUthenticated){
            return res.status(401).json({
                message:`permission denied, kindly login.`
            })
        }else{
            return res.status(200).json({
                message:`welcome to my homepage.`
            })
        }
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
        
    }
};




exports.logIn = async(req,res)=>{
    try {
        const {email,password}= req.body;
        
        const checkUser = await userModel.findOne({email});

        if(!checkUser){
            return res.status(404).json({
                message:`user with email does not exist.`
            });
        }

        if(checkUser.password != password){
            return res.status(400).json({
                message:`incorrect password.`
            })
        }

        res.status(200).json({
            message:`login successful`,
            data : checkUser
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
         
    }
}