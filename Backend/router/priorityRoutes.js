const router = require("express").Router()
const {addPriority} = require('../controller/priorityControl')

router.post("/addPriority", addPriority)

module.exports = router