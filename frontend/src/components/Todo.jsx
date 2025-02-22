import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Link } from "react-router-dom";

function Todo() {
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    priority: "Medium", // Default priority
  });
  const [todos, setTodos] = useState([]);

  const token = localStorage.getItem("token");
  const decode = token ? jwtDecode(token) : null;
  const user_id = decode?._id;

  // ✅ Fetch Todos once when component mounts
  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/alltask/${user_id}`
        );
        setTodos(response.data.tasks);
        console.log(response.data.tasks);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodo();
  }, []); // Empty dependency array to avoid infinite loop

  const handleChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const handleAddTodo = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/addTask/${user_id}`,
        todo
      );
      setTodos([...todos, response.data.task]); // ✅ Update UI without re-fetching
      setTodo({ title: "", description: "", priority: "Medium" }); // ✅ Reset input fields
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTask = async (task_id) => {
    const response = await axios.delete(
      `http://localhost:3000/deleteTask/${task_id}`
    );
    fetchTodo();
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h1 className="text-center text-3xl font-bold text-gray-800">
          Todo List
        </h1>

        {/* Inputs & Button */}
        <div className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Enter title..."
            className="w-full border rounded-lg px-3 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="title"
            value={todo.title}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Enter description..."
            className="w-full border rounded-lg px-3 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="description"
            value={todo.description}
            onChange={handleChange}
          />

          {/* Priority Selection */}
          <div className="flex justify-between items-center">
            {["High", "Medium", "Low"].map((level) => (
              <label key={level} className="flex items-center">
                <input
                  type="radio"
                  name="priority"
                  value={level}
                  checked={todo.priority === level}
                  onChange={handleChange}
                  className="mr-2"
                />
                {level}
              </label>
            ))}
          </div>

          <button
            onClick={handleAddTodo}
            className="w-full bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Add Todo
          </button>
        </div>

        {/* Todo Table */}
        <div className="mt-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Priority</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {todos.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No Todos Added
                  </td>
                </tr>
              ) : (
                todos.map((todo, index) => (
                  <tr
                    key={index}
                    className="border-b bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <td className="p-3">{todo.title}</td>
                    <td className="p-3">{todo.description}</td>
                    <td className="p-3 font-semibold">
                      {todo.priority_id.priority_level}
                    </td>
                    <td className="p-3 font-semibold">
                      {todo.status_id.status_type}
                    </td>
                    <td className="p-3 text-center">
                      <button
                        className="text-red-500 hover:text-red-600 cursor-pointer block"
                        onClick={() => deleteTask(todo._id)}
                      >
                        Delete
                      </button>
                      <Link
                        to={`/edit/${todo._id}`}
                        className="text-green-500 hover:text-green-600 cursor-pointer block"
                      >
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
