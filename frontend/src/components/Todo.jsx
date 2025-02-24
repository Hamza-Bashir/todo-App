import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Todo() {
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    status_type:"",
    priority_level:""
  });
  const [todos, setTodos] = useState([]);

  const token = localStorage.getItem("token");
  const decode = token ? jwtDecode(token) : null;
  const user_id = decode?._id;

  const fetchTodo = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/alltask/${user_id}`
      );
      setTodos(response.data.tasks || []);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    if (user_id) fetchTodo();
  }, [user_id]);

  const handleChange = (e) => {
    const {name,value} = e.target
    setTodo({ ...todo, [name] : value });
  };

  const handleAddTodo = async () => {
    if (!todo.title || !todo.description ) {
      return toast.error("All fields are required!", { position: "top-right" });
    }
    try {
      
      const response = await axios.post(
        `http://localhost:3000/addTask/${user_id}`,
        todo
      );
      fetchTodo()
     
      toast.success("Todo added successfully!", { position: "top-right" });

      setTodo({ title: "", description: "", status:"", priority:"" });
    } catch (error) {
      toast.error(error.response?.data?.error || "Error adding task", {
        position: "top-right",
      });
      
    }
  };

  

  const deleteTask = async (task_id) => {
    try {
      await axios.delete(`http://localhost:3000/deleteTask/${task_id}`);
      setTodos((prevTodos) => prevTodos.filter((task) => task._id !== task_id));
      toast.success("Task deleted successfully!", { position: "top-right" });
    } catch (error) {
      toast.error("Error deleting task!", { position: "top-right" });
      console.error(error);
    }
  };

  
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h1 className="text-center text-3xl font-bold text-gray-800">Todo List</h1>
  
        <div className="mt-6 space-y-4">
          <div>
            <input
              type="text"
              placeholder="Enter title..."
              className="w-full border rounded-lg px-3 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="title"
              onChange={handleChange}
              value={todo.title}
            />
          </div>
  
          <div>
            <input
              type="text"
              placeholder="Enter description..."
              className="w-full border rounded-lg px-3 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="description"
              value={todo.description}
              onChange={handleChange}
            />
          </div>
  
          
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-gray-800">Status</h2>
            <div className="flex gap-4">
              <label className="flex items-center space-x-2">
                <input type="radio" name="status_type" value="Complete" checked = {todo.status_type === "Complete"} onChange={handleChange}/>
                <span className="text-gray-700">Complete</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="status_type" value="UnComplete"  checked = {todo.status_type === "UnComplete"} onChange={handleChange} />
                <span className="text-gray-700">UnComplete</span>
              </label>
            </div>
          </div>
  
          
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-gray-800">Priority</h2>
            <div className="flex gap-4">
              <label className="flex items-center space-x-2">
                <input type="radio" name="priority_level" value="High" checked = {todo.priority_level === "High"} onChange={handleChange} />
                <span className="text-gray-700">High</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="priority_level" value="Medium" checked = {todo.priority_level === "Medium"} onChange={handleChange} />
                <span className="text-gray-700">Medium</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="priority_level" value="Low" checked = {todo.priority_level === "Low"} onChange={handleChange} />
                <span className="text-gray-700">Low</span>
              </label>
            </div>
          </div>
  
          
          <button
            className="w-full bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition duration-300" onClick={handleAddTodo}
          >
            Add Todo
          </button>
        </div>
  
        
        <div className="mt-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Priority</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {todos.length === 0 ? (
                <h1 className="font-bold mt-4">No todo added</h1>
              ) : (
                todos.map((todo, index)=>(
                  <tr 
                  key={index}
                  className="border-b bg-gray-50 hover:bg-gray-100 transition">
                <td className="p-3">{todo.title}</td>
                <td className="p-3">{todo.description}</td>
                <td className="p-3">{todo.status_id?.status_type}</td>
                <td className="p-3">{todo.priority_id?.priority_level}</td>
                <td className="p-3 text-center">
                  <button className="text-red-500 hover:text-red-600 cursor-pointer block" onClick={()=>deleteTask(todo._id)}>
                    Delete
                  </button>
                  <Link to={`/edit/${todo._id}`} className="text-green-500 hover:text-green-600 cursor-pointer block">
                    Edit
                  </Link>
                </td>
              </tr>
                ))
                
              )}
              
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  
}

export default Todo;
