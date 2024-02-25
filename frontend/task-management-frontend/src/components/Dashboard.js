import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchTasks, addTask } from "../tasksSlice";
import TaskList from "./TaskList";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tasks = useSelector((state) => state.tasks.items);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: new Date(),
    startTime: "",
    endTime: "",
  });

  const username = localStorage.getItem("username");

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAddTaskSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      title: newTask.title,
      description: newTask.description,
      dueDate: newTask.dueDate.toISOString().split("T")[0],
      startTime: newTask.startTime,
      endTime: newTask.endTime,
      isCompleted: false,
    };
    dispatch(addTask(taskData));
    setNewTask({
      title: "",
      description: "",
      dueDate: new Date(),
      startTime: "",
      endTime: "",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Dashboard
          </a>
          <div className="d-flex align-items-center">
            {username && (
              <span className="navbar-text me-3">Welcome, {username}</span>
            )}
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>
      <h2>Add New Task</h2>
      <form onSubmit={handleAddTaskSubmit} className="mb-3">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-3">
          <DatePicker
            className="form-control"
            selected={newTask.dueDate}
            onChange={(date) => setNewTask({ ...newTask, dueDate: date })}
            dateFormat="yyyy/MM/dd"
          />
        </div>
        <div className="mb-3">
          <input
            type="time"
            className="form-control"
            value={newTask.startTime}
            onChange={(e) =>
              setNewTask({ ...newTask, startTime: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="time"
            className="form-control"
            value={newTask.endTime}
            onChange={(e) =>
              setNewTask({ ...newTask, endTime: e.target.value })
            }
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Task
        </button>
      </form>
      <TaskList tasks={tasks} />
    </div>
  );
};

export default Dashboard;
