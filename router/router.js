const {createUser} = require("../controllers/userController");
const router = require("express").Router();



router.post("/createuser",createUser);



module.exports = router;