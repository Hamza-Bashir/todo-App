const router = require("express").Router()
const {signIn, login} = require("../controller/userControl")

router.post("/signIn", signIn)
router.post("/login", login)

module.exports = router