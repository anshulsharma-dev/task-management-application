import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, addTask } from "../tasksSlice"; // Ensure these actions are correctly implemented
import TaskList from "./TaskList";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.items);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: new Date(),
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAddTaskSubmit = async (e) => {
    e.preventDefault();
    const taskData = {
      title: newTask.title,
      description: newTask.description,
      dueDate: newTask.dueDate.toISOString().split("T")[0],
      startTime: newTask.startTime,
      endTime: newTask.endTime,
      isCompleted: false,
    };
    dispatch(addTask(taskData)); // Dispatch the action to add a task
    setNewTask({
      title: "",
      description: "",
      dueDate: new Date(),
      startTime: "",
      endTime: "",
    }); // Reset form after submission
  };

  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>
      <form onSubmit={handleAddTaskSubmit} className="mb-3">
        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
          required
        />
        <DatePicker
          selected={newTask.dueDate}
          onChange={(date) => setNewTask({ ...newTask, dueDate: date })}
          dateFormat="yyyy/MM/dd"
        />
        <input
          type="time"
          value={newTask.startTime}
          onChange={(e) =>
            setNewTask({ ...newTask, startTime: e.target.value })
          }
          required
        />
        <input
          type="time"
          value={newTask.endTime}
          onChange={(e) => setNewTask({ ...newTask, endTime: e.target.value })}
          required
        />
        <button type="submit">Add Task</button>
      </form>
      <TaskList tasks={tasks} />
    </div>
  );
};

export default Dashboard;
