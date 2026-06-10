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
  maintainAspectRatio: false,

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
        // length: "100px",
      },
      ticks: {
        color: "#026e7e",
      },
    },
    y: {
      grid: {
        display: false, // removes horizontal grid lines
        drawBorder: false,
      },
      ticks: {
        color: "#026e7e", // sets y-axis label color
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
        backgroundColor: "#026e7e",
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
        height: "320px",
        minWidth: "300px",
        backgroundImage: "linear-gradient(to top,  #ffffff)",
        // border: "2px solid #026e7e",
        padding: "10px",
        borderRadius: "20px",
        margin: "0px 0px",
        position: "relative",
        // boxShadow: "0px 5px 10px #d3d3e6",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        {" "}
        <Bar width={"100%"} data={chartData} options={options} />
      </div>
    </div>
  );
}
