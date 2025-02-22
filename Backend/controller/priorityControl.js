const priority = require("../model/priorityModel")

const addPriority = async (req,res)=>{
  try {
    const {priority_level} = req.body
    const existingPriority = await priority.findOne({priority_level})

    if(existingPriority){
      return res.status(400).json({
        message:"Priority level already exist",
        success:false
      })
    }

    const newPriority = await priority({
      priority_level
    })

    await newPriority.save()

    res.status(200).json({
      message:"Priority add successfully",
      newPriority
    })
    
  } catch (error) {
    res.status(500).json({
      error:error.message
    })
  }
}

module.exports = {addPriority}