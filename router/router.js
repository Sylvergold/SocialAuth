const {createUser,homePage,logIn} = require("../controllers/userController");
const router = require("express").Router();



router.post("/createuser",createUser);
router.get("/",homePage);

router.post("/login",logIn);


module.exports = router;