const mongoose = require("mongoose")

const statusSch = mongoose.Schema({
  status_type:{
    type:String,
    required:true,
    unique:true
  }
})

const statusModel = mongoose.model("status", statusSch)

module.exports = statusModel