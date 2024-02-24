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
  // Calculate durations and labels for the graph
  const labels = tasks.map((task) => task.title);
  const durations = tasks.map((task) => {
    const start = new Date(`2021-01-01T${task.startTime}:00`);
    const end = new Date(`2021-01-01T${task.endTime}:00`);
    const diff = (end - start) / (1000 * 60 * 60); // Convert milliseconds to hours
    return diff;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Task Duration (hours)",
        data: durations,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
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
      <h3>Task Duration Graph</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default TaskGraph;
