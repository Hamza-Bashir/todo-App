const task = require("../model/taskModel");
const user = require("../model/userModel");
const status = require("../model/statusModel");
const priority = require("../model/priorityModel");
const mongoose = require("mongoose")
// const taskSchema = require("../validation/taskValidation")

const addTask = async (req, res) => {
  try {
    const { title, description, status_type, priority_level } = req.body;
    const user_id = req.params.user_id;

    // Fetch status and priority from their respective collections (if required)
    const Status = await status.findOne({ status_type });
    const Priority = await priority.findOne({ priority_level });

    // Check if status and priority exist
    if (!Status) {
      return res.status(400).json({ message: "Error: Status type not found" });
    }
    if (!Priority) {
      return res.status(400).json({ message: "Error: Priority level not found" });
    }

    

    // Create the task with status_id and priority_id
    const newTask = new task({
      title,
      description,
      user_id,
      status_id: Status._id, // Assign the correct status_id
      priority_id: Priority._id, // Assign the correct priority_id
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

    const allTask = await task.find({user_id}).populate("status_id", "status_type").populate("priority_id", "priority_level")
    res.status(200).json({
      tasks:allTask
    })
    
  } catch (error) {
    res.status(500).json({
      error:error.message
    })
  }
}

const getUpdateTask = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find the task by ID and populate the status and priority fields
    const existingtask = await task.findById(id)
      .populate('status_id', 'status_type')  // Populate status_id with status_type
      .populate('priority_id', 'priority_level');  // Populate priority_id with priority_level

    // Check if the task exists
    if (!existingtask) {
      return res.status(400).json({
        message: 'Task not found',
      });
    }
    await existingtask.save()
    // Return the task along with status_type and priority_level
    res.status(200).json({
      existingtask,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


const updateTask = async (req, res) => {
  try {
    const task_id = req.params.task_id;
    const { title, description, status_type, priority_level } = req.body;

    let existingTask = await task.findById(task_id)
      .populate("status_id", "status_type")
      .populate("priority_id", "priority_level");

    if (!existingTask) {
      return res.status(400).json({
        message: "Task not found"
      });
    }

    if (status_type) {
      const statusData = await status.findOne({ status_type });
      if (!statusData) {
        return res.status(400).json({
          message: "Status not found"
        });
      }
      existingTask.status_id = statusData._id;
    }

    // Correct the query for priority_level to use the `priority` model instead of `status`
    if (priority_level) {
      const priorityData = await priority.findOne({ priority_level });
      if (!priorityData) {
        return res.status(400).json({
          message: "Priority not found"
        });
      }
      existingTask.priority_id = priorityData._id;
    }

    if (title) existingTask.title = title;
    if (description) existingTask.description = description;

    await existingTask.save();

    res.status(200).json({
      message: "Task updated successfully",
      existingTask
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};


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
