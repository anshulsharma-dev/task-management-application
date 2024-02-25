import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TaskList = ({ tasks, fetchTasks }) => {
  const [postponeDate, setPostponeDate] = useState(new Date());
  const [isPostponing, setIsPostponing] = useState(null);

  const handleCompleteTask = async (taskId) => {
    try {
      await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isCompleted: true }),
      });
      fetchTasks();
    } catch (error) {
      console.error("Failed to complete task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: "DELETE",
      });
      fetchTasks();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handlePostponeTask = async (taskId) => {
    try {
      await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dueDate: postponeDate.toISOString().split("T")[0],
        }),
      });
      fetchTasks();
      setIsPostponing(null);
    } catch (error) {
      console.error("Failed to postpone task:", error);
    }
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{new Date(task.dueDate).toLocaleDateString()}</td>
              <td>{task.startTime}</td>
              <td>{task.endTime}</td>
              <td>{task.isCompleted ? "Completed" : "Pending"}</td>
              <td>
                <button
                  onClick={() => handleCompleteTask(task._id)}
                  disabled={task.isCompleted}
                  className="btn btn-success me-2"
                  style={{
                    cursor: task.isCompleted ? "not-allowed" : "pointer",
                  }}
                >
                  Complete
                </button>
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="btn btn-danger me-2"
                >
                  Delete
                </button>
                {isPostponing === task._id ? (
                  <>
                    <DatePicker
                      selected={postponeDate}
                      onChange={(date) => setPostponeDate(date)}
                      dateFormat="yyyy/MM/dd"
                      minDate={new Date()}
                      className="form-control d-inline-block w-auto me-2"
                    />
                    <button
                      onClick={() => handlePostponeTask(task._id)}
                      className="btn btn-info me-2"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsPostponing(task._id)}
                    disabled={task.isCompleted}
                    className="btn btn-warning"
                    style={{
                      cursor: task.isCompleted ? "not-allowed" : "pointer",
                    }}
                  >
                    Postpone
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
