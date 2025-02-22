import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditTodo() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the task ID from URL

  const [todo, setTodo] = useState({
    title: "",
    description: "",
    priority: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/edit/${id}`);
        console.log(response.data);
        setTodo(response.data.existingtask); // ✅ Store task data properly
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchData();
  }, [id]); // ✅ Dependency array with ID

  const handleEdit = async () => {
    const response = await axios.put(
      `http://localhost:3000/updateTask/${id}`,
      todo
    );
    console.log("Task updated successfully");
    navigate("/todo");
  };
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h1 className="text-center text-3xl font-bold text-gray-800">
          Edit Todo
        </h1>

        {/* Inputs */}
        <div className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Enter title..."
            className="w-full border rounded-lg px-3 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="title"
            value={todo.title} // ✅ Show fetched title
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Enter description..."
            className="w-full border rounded-lg px-3 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="description"
            value={todo.description} // ✅ Show fetched description
            onChange={(e) => setTodo({ ...todo, description: e.target.value })}
          />

          {/* Priority Selection */}
          <div className="flex justify-between items-center">
            {["High", "Medium", "Low"].map((level) => (
              <label key={level} className="flex items-center">
                <input
                  type="radio"
                  name="priority"
                  value={level}
                  className="mr-2"
                  checked={todo.priority === level} // ✅ Set selected priority
                  onChange={(e) =>
                    setTodo({ ...todo, priority: e.target.value })
                  }
                />
                {level}
              </label>
            ))}
          </div>

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
