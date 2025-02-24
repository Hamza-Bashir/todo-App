import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function EditTodo() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the task ID from URL

  const [todo, setTodo] = useState({
    title: "",
    description: "",
    priority_level: "",
    status_type: "", // Add status_type in the state to manage it
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/edit/${id}`);
        
        const statusType = response.data.existingtask.status_id ? response.data.existingtask.status_id.status_type : '';
        const priorityLevel = response.data.existingtask.priority_id ? response.data.existingtask.priority_id.priority_level : '';
  
        setTodo({
          title: response.data.existingtask.title,
          description: response.data.existingtask.description,
          status_type: statusType, // Set status_type only if status_id is available
          priority_level: priorityLevel, // Set priority_level only if priority_id is available
        });
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };
  
    fetchData();
  }, [id]);

  const handleEdit = async () => {
    const response = await axios.put(
      `http://localhost:3000/updateTask/${id}`,
      todo
    );
    toast.success("Task updated successfully", { position: "top-right" });
    navigate("/todo");
  };

  const handleChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h1 className="text-center text-3xl font-bold text-gray-800">Edit Todo</h1>

        {/* Inputs */}
        <div className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Enter title..."
            className="w-full border rounded-lg px-3 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="title"
            value={todo.title} // Show fetched title
            onChange={handleChange} // Use handleChange for title
          />
          <input
            type="text"
            placeholder="Enter description..."
            className="w-full border rounded-lg px-3 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="description"
            value={todo.description} // Show fetched description
            onChange={handleChange} // Use handleChange for description
          />

          {/* Status radio buttons */}
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-gray-800">Status</h2>
            <div className="flex gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="status_type" // Use status_type instead of status
                  value="Complete"
                  checked={todo.status_type === "Complete"} // Auto-select if matching
                  onChange={handleChange} // Use handleChange for status
                />
                <span className="text-gray-700">Complete</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="status_type" // Use status_type instead of status
                  value="UnComplete"
                  checked={todo.status_type === "UnComplete"} // Auto-select if matching
                  onChange={handleChange} // Use handleChange for status
                />
                <span className="text-gray-700">UnComplete</span>
              </label>
            </div>
          </div>

          {/* Priority radio buttons */}
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-gray-800">Priority</h2>
            <div className="flex gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="priority_level" // Ensure name is 'priority_level'
                  value="High"
                  checked={todo.priority_level === "High"} // Auto-select if matching
                  onChange={handleChange} // Use handleChange for priority
                />
                <span className="text-gray-700">High</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="priority_level" // Ensure name is 'priority_level'
                  value="Medium"
                  checked={todo.priority_level === "Medium"} // Auto-select if matching
                  onChange={handleChange} // Use handleChange for priority
                />
                <span className="text-gray-700">Medium</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="priority_level" // Ensure name is 'priority_level'
                  value="Low"
                  checked={todo.priority_level === "Low"} // Auto-select if matching
                  onChange={handleChange} // Use handleChange for priority
                />
                <span className="text-gray-700">Low</span>
              </label>
            </div>
          </div>

          {/* Edit button */}
          <button
            className="w-full bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            onClick={handleEdit}
          >
            Edit Todo
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTodo;
