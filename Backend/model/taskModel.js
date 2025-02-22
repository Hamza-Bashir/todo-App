const mongoose = require("mongoose")

const taskSch = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  user_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true
  },
  status_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"status",
    required:true
  },
  priority_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"priority",
    required:true
  }
})

const taskModel = mongoose.model("task", taskSch)

module.exports = taskModel