import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Todo() {
  const [todo, setTodo] = useState({
    title: "",
    description: "",
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
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const handleAddTodo = async () => {
    if (!todo.title || !todo.description) {
      return toast.error("All fields are required!", { position: "top-right" });
    }
    try {
      const response = await axios.post(
        `http://localhost:3000/addTask/${user_id}`,
        todo
      );
      fetchTodo()
      
      toast.success("Todo added successfully!", { position: "top-right" });

      setTodo({ title: "", description: "" });
    } catch (error) {
      toast.error(error.response?.data?.error || "Error adding task", {
        position: "top-right",
      });
      console.error(error);
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

  todos.map((todo)=>(
    console.log(todo.title)
  ))
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h1 className="text-center text-3xl font-bold text-gray-800">
          Todo List
        </h1>

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

          <button
            onClick={handleAddTodo}
            className="w-full bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
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
                    <td className="p-3">{todo.status || "Pending"}</td>
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
