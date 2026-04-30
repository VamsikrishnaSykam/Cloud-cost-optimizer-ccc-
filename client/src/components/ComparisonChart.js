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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ComparisonChart({ results }) {
  if (!results) return null;

  const data = {
    labels: ["Greedy", "Dynamic Programming"],
    datasets: [
      {
        label: "Total Cost",
        data: [results.greedyCost, results.dpCost],
        backgroundColor: ["#5f8cff", "#00d29f"],
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#d7e0ff",
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#d7e0ff" },
        grid: { color: "rgba(255,255,255,0.08)" },
      },
      y: {
        ticks: { color: "#d7e0ff" },
        grid: { color: "rgba(255,255,255,0.08)" },
      },
    },
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Cost Comparison Chart</h3>
      <Bar data={data} options={options} />
    </div>
  );
}

const styles = {
  card: {
    background: "rgba(20, 23, 36, 0.9)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    borderRadius: "16px",
    padding: "16px",
    marginTop: "16px",
  },
  title: {
    marginTop: 0,
    color: "#fff",
  },
};

export default ComparisonChart;
