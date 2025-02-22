const mongoose = require("mongoose")

const prioritySch = mongoose.Schema({
  priority_level:{
    type:String,
    required:true,
    unique:true
  }
})

const priorityModel = mongoose.model("priority", prioritySch)

module.exports = priorityModel