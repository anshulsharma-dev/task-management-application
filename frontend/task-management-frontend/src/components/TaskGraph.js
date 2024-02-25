import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TaskGraph = ({ tasks }) => {
  const tasksByDate = tasks.reduce((acc, task) => {
    const dueDate = task.dueDate;
    if (!acc[dueDate]) {
      acc[dueDate] = { completed: 0, pending: 0 };
    }
    task.isCompleted ? acc[dueDate].completed++ : acc[dueDate].pending++;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(tasksByDate),
    datasets: [
      {
        label: "Completed Tasks",
        data: Object.values(tasksByDate).map((data) => data.completed),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Pending Tasks",
        data: Object.values(tasksByDate).map((data) => data.pending),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h3>Task Completion Graph</h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default TaskGraph;
