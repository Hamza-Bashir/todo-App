const status = require("../model/statusModel")


const addStatus = async (req,res)=>{
  try {
    const {status_type} = req.body
    const existingStatus = await status.findOne({status_type})
    if(existingStatus){
      return res.status(400).json({
        message:"Status type already exist"
      })
    }

    const newStatus = await status({
      status_type
    })

    await newStatus.save()
    res.status(200).json({
      message:"Status added successfully",
      newStatus
    })
  } catch (error) {
    res.status(500).json({
      error:error.message
    })
  }
}

module.exports = {addStatus}