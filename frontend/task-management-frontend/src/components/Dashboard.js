import React, { useState } from "react";
import TaskList from "./TaskList";
import TaskGraph from "./TaskGraph";

const Dashboard = () => {
  const [tasks, setTasks] = useState([
    // Example tasks
    {
      id: 1,
      title: "Task 1",
      description: "Description 1",
      isCompleted: false,
      startTime: "09:00",
      endTime: "10:00",
    },
    {
      id: 2,
      title: "Task 2",
      description: "Description 2",
      isCompleted: true,
      startTime: "10:00",
      endTime: "11:00",
    },
    // Add more tasks as needed
  ]);

  // Method to mark task as done
  const completeTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted: true } : task
      )
    );
  };

  // Method to cancel a task
  const cancelTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Method to postpone a task
  const postponeTask = (taskId) => {
    // Logic to postpone the task to the next day
  };

  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>
      <TaskList
        tasks={tasks}
        completeTask={completeTask}
        cancelTask={cancelTask}
        postponeTask={postponeTask}
      />
      <TaskGraph tasks={tasks} />
    </div>
  );
};

export default Dashboard;
