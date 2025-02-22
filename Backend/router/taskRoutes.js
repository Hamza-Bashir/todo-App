const router = require("express").Router()
const {addTask, updateTask, updateTaskStatus, deleteTask, getTask, getUpdateTask} = require("../controller/taskControl")

router.post("/addTask/:user_id", addTask)
router.put("/updateTask/:task_id", updateTask)
router.get("/updatedStatus/:task_id", updateTaskStatus)
router.delete("/deleteTask/:task_id", deleteTask)
router.get("/alltask/:user_id", getTask)
router.get("/edit/:id", getUpdateTask)

module.exports = router