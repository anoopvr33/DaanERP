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

// Chart options
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Monthly Expense Data",
    },
  },

  scales: {
    x: {
      grid: {
        display: false, // removes vertical grid lines
        drawBorder: false, // removes axis border
        length: "100px",
      },
    },
    y: {
      grid: {
        display: false, // removes horizontal grid lines
        drawBorder: false,
      },
      ticks: {
        color: "rgba(0, 0, 0, 0.5)", // sets y-axis label color
        display: true, // hides y-axis labels
        beginAtZero: true, // starts y-axis at zero
      },
    },
  },
};

export default function ExpenseChart({ data }) {
  // Chart data

  const chartData = {
    labels: data?.slice(0, 6).map((i) => i.month),
    datasets: [
      {
        label: "Expense",
        data: data?.slice(0, 6).map((i) => i.expense),
        backgroundColor: "rgb(61, 185, 144)",
        barTickness: 10,
        borderRadius: 5,
        barPercentage: 0.6,
        maxBarThickness: 100,
        // barPercentage: 0.6,
      },
    ],
  };

  return (
    <div
      style={{
        width: "100%",
        height: "320px",
        backgroundImage: "linear-gradient(to right, #55b197, #bde8d1)",
        padding: "10px",
        borderRadius: "20px",
        margin: "0px 0px",
        // boxShadow: "0px 5px 10px #d3d3e6",
      }}
    >
      <Bar data={chartData} options={options} />
    </div>
  );
}
