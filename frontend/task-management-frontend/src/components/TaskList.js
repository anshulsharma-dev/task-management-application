import React from "react";

const TaskList = ({ tasks, completeTask, cancelTask, postponeTask }) => {
  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <button onClick={() => completeTask(task.id)}>Complete</button>
          <button onClick={() => cancelTask(task.id)}>Cancel</button>
          <button onClick={() => postponeTask(task.id)}>Postpone</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
