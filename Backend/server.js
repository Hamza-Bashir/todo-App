const express = require("express")
const conn = require("./conn/db")
const app = express()
const userRouter = require("./router/userRoutes")
const statusRouter = require("./router/statusRoutes")
const priorityRouter = require("./router/priorityRoutes")
const taskRouter = require("./router/taskRoutes")
const cors = require("cors")


require("dotenv").config()

app.use(express.json())
app.use(cors())

app.use("/", userRouter)
app.use("/", statusRouter)
app.use("/", priorityRouter)
app.use("/", taskRouter)


app.listen(3000, ()=>{
  console.log("Server start")
  conn()
})