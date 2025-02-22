const router = require("express").Router()

const {addStatus} = require("../controller/statusControl")

router.post("/addStatus", addStatus)

module.exports = router