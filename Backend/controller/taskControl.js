const task = require("../model/taskModel");
const user = require("../model/userModel");
const status = require("../model/statusModel");
const priority = require("../model/priorityModel");
const mongoose = require("mongoose")
const taskSchema = require("../validation/taskValidation")

const addTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const {error} = taskSchema.validate(req.body)
    if(error){
      return res.status(400).json({
        error:error.message
      })
    }
    const user_id = req.params.user_id;

    // Fetch status and priority
    const status_type = await status.findOne({ status_type: "Complete" } );
    const priority_level = await priority.findOne({ priority_level: "High" } );

    // Check if status and priority exist
    if (!status_type) {
      return res.status(400).json({ message: "Error: Status type 'Complete' not found" });
    }
    if (!priority_level) {
      return res.status(400).json({ message: "Error: Priority level 'High' not found" });
    }

    // Create and save the new task
    const newTask = new task({
      title,
      description,
      user_id,
      status_id: status_type._id,
      priority_id: priority_level._id,
    });

    await newTask.save();

    res.status(200).json({
      message: "Task added successfully",
      newTask,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getTask = async (req,res)=>{
  try {

    const user_id = req.params.user_id

    if(!mongoose.Types.ObjectId.isValid(user_id)){
      return res.status(400).json({
        message:"User id is invalid"
      })
    }
    const existingUser = await user.findById(user_id)

    if(!existingUser){
      return res.status(400).json({
        message:"User not found",
        success:false
      })
    }

    const allTask = await task.find({user_id}).populate( "status_id").populate("priority_id")
    res.status(200).json({
      tasks:allTask
    })
    
  } catch (error) {
    res.status(500).json({
      error:error.message
    })
  }
}

const getUpdateTask = async (req,res)=>{
  try {
    const {id} = req.params
    const existingtask = await task.findById(id)
    if(!task){
      return res.status(400).json({
        message:"Task not found"
      })
    }

    res.status(200).json({
      existingtask
    })
  } catch (error) {
    res.status(500).json({
      error:error.message
    })
  }
}

const updateTask = async (req,res)=>{
  try {

    const task_id = req.params.task_id
    const {title, description, status_type, priority_level} = req.body

    let existingTask = await task.findById(task_id)

    if(!existingTask){
      return res.status(400).json({
        message:"Task not found"
      })
    }

    if(status_type){
      const statusData = await status.findOne({status_type})
      if(!statusData){
        return res.status(400).json({
          message:"Status not found"
        })
      }
      existingTask.status_id = statusData._id
    }

    if(priority_level){
      const priorityData = await status.findOne({status_type})
      if(!priorityData){
        return res.status(400).json({
          message:"Priority not found"
        })
      }
      existingTask.priority_id = priorityData._id
    }

    if(title) existingTask.title = title
    if(description) existingTask.description = description

    await existingTask.save()

    res.status(200).json({
      message:"Task updated successfully"
    })
    
  } catch (error) {
    res.status(500).json({
      error:error.message
    })
  }
}

const updateTaskStatus = async (req,res)=>{
  try {
    const task_id = req.params.task_id

    const existingTask = await task.findById(task_id)

    if(!existingTask){
      return res.status("Task not found")
    }

    const existingStatus = await status.findOne({status_type:"Incomplete"})

    if(!existingStatus){
      return res.status(400).json({
        message:"Status not found"
      })
    }

    existingTask.status_id = existingStatus._id

    await existingTask.save()

    res.status(200).json({
      message:"Task status updated",
      existingTask
    })


  } catch (error) {
    res.status(500).json({
      error:error.message
    })
  }
}

const deleteTask = async (req,res)=>{
  try {
    const task_id = req.params.task_id

    const existingTask = await task.findById(task_id)
    if(!existingTask){
      return res.status(400).json({
        message:"Task not found"
      })
    }

    const deletetask = await task.deleteOne({_id:task_id})
    res.status(200).json({
      message:"Task delete successfully",
      deletetask
    })
  } catch (error) {
    res.status(500).json({
      error:error.message
    })
  }
}

module.exports = { addTask, updateTask, updateTaskStatus, deleteTask,getTask,getUpdateTask };
