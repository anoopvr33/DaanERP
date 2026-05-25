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

// Chart options
const options = {
  window: {
    width: "100%",
    responsive: true,
    maintainAspectRatio: false,
  },
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Monthly Sales Data",
      font: {
        size: 16,
      },
      color: "#836767",
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
      // title: {
      //   text: "Sales",
      //   display: true,
      //   color: "#836767",
      //   font: {
      //     size: 14,
      //   },
      // },
      grid: {
        display: false, // removes horizontal grid lines
        drawBorder: false,
      },
      ticks: {
        display: true, // hides y-axis labels
        beginAtZero: true, // starts y-axis at zero
      },
    },
  },
};

export default function Chart({ data }) {
  const chartData = {
    labels: data?.slice(0, 6).map((i) => i.month),
    datasets: [
      {
        // responsive: true,
        label: "Sales",
        data: data?.slice(0, 6).map((i) => i.sales),
        backgroundColor: "rgb(255, 251, 240)",
        barTickness: 30,
        // barPercentage: 0.6,
        borderRadius: 5,
        maxBarThickness: 50,
      },
    ],
  };

  return (
    <div
      style={{
        width: "100%",
        height: "320px",
        backgroundImage: "linear-gradient(to right,  #f9a231, #ffd6c2)",
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
