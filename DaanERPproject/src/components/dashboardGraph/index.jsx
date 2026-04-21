import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

// Chart data
const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "Sales",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: "rgb(190, 133, 255)",
      barTickness: 10,
      barPercentage: 0.6,
    },
  ],
};

// Chart options
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Monthly Sales Data",
    },
  },
  scales: {
    x: {
      grid: {
        display: false, // removes vertical grid lines
        drawBorder: false, // removes axis border
      },
    },
    y: {
      grid: {
        display: false, // removes horizontal grid lines
        drawBorder: false,
      },
      ticks: {
        display: false, // hides y-axis labels
        beginAtZero: true, // starts y-axis at zero
      },
    },
  },
};

export default function Chart() {
  return (
    <div
      style={{
        width: "100%",
        height: "320px",
        background: "rgb(255, 255, 255)",
        padding: "10px",
        borderRadius: "20px",
        margin: "0px 0px",
        // boxShadow: "0px 5px 10px #d3d3e6",
      }}
    >
      <Bar data={data} options={options} />
    </div>
  );
}
