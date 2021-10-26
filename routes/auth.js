
var express = require("express")
var router = express.Router()

const {signup, login}= require("../controller/authController")



router.post('/signup', signup)

router.post('/login', login)

module.exports = router