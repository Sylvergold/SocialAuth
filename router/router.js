const passport = require("passport");
const {createUser,homePage,logIn,logout,signGoogle,redirect} = require("../controllers/userController");
const router = require("express").Router();
const userModel = require("../models/userModel");

router.post("/createuser",createUser);
router.get("/",homePage);

router.post("/login",logIn);
router.post("/logout",logout);

router.get("/googlesignup",signGoogle);
router.get("/google/callback",redirect);

router.get("/auth/google/success", async (req, res) => {
    try {
        if (req.user && req.user._json) {
            const { email, name, picture } = req.user._json;

            // Check if the user already exists
            const existingUser = await userModel.findOne({ email });
            if (existingUser) {
                return res.status(200).json({ 
                    message: `User with email ${email} already exists`
                });
            }

            // Create a new user with optional password field
            const user = await userModel.create({
                fullName: name,
                picture: picture,
                email: email,
                password: '' // Or any default value if necessary
            });

            return res.status(201).json({ 
                message: 'Successfully created', 
                data: user 
            });

        } else {
            return res.status(400).json({ 
                message: 'User data not found' 
            });
        }
    } catch (error) {
        return res.status(500).json({ 
            message: error.message 
        });
    }
});

module.exports = router;
