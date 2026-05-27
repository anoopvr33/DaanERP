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
  responsive: true,
  maintainAspectRatio: false,

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
        label: "Sales",
        data: data?.slice(0, 6).map((i) => i.sales),
        backgroundColor: "rgb(255, 251, 240)",
        barTickness: 30,
        borderRadius: 5,
        maxBarThickness: 50,
      },
    ],
  };

  return (
    <div
      style={{
        width: "100%",
        minWidth: "300px",
        height: "320px",
        backgroundImage: "linear-gradient(to right, #f9a231, #ffd6c2)",
        padding: "10px",
        borderRadius: "20px",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        <Bar width={"100%"} data={chartData} options={options} />
      </div>
    </div>
  );
}
