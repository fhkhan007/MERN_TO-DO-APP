import { useState } from "react";
import "../style/addtask.css";
import { useNavigate } from "react-router-dom";

export default function AddTask() {
  const [taskData, setTaskData] = useState({});
  const navigate = useNavigate();

  const handleAddTask = async () => {
    if (!taskData?.title || !taskData?.description) {
      alert("Please fill all fields");
      return;
    }

    let result = await fetch("http://localhost:3200/add-task", {
      method: "POST",
      body: JSON.stringify(taskData),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();

    if (result.success) {
      console.log("new task added");
      navigate("/");
    } else {
      alert("try after sometime");
    }
  };

  return (
    <div className="container">
      <h1>Add New Task</h1>

      <label>Title</label>
      <input
        onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
        type="text"
        placeholder="Enter task title"
      />

      <label>Description</label>
      <textarea
        onChange={(e) =>
          setTaskData({ ...taskData, description: e.target.value })
        }
        rows={4}
        placeholder="Enter task description"
      />

      <button onClick={handleAddTask} className="submit">
        Add New Task
      </button>
    </div>
  );
}
