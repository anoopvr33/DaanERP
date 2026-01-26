// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// const data = [
//   { name: "Jan", value: 400 },
//   { name: "Feb", value: 300 },
//   { name: "Mar", value: 500 },
// ];

// function MyBarChart() {
//   return (
//     <ResponsiveContainer width="100%" height={300}>
//       <BarChart data={data}>
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Tooltip />
//         <Bar dataKey="value" fill="#4c7cff" />
//       </BarChart>
//     </ResponsiveContainer>
//   );
// }

// export default MyBarChart;
// App.js

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
      backgroundColor: "#7070a3",
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
};

export default function Chart() {
  return (
    <div
      style={{
        width: "1000px",
        height: "400px",
        background: "white",
        padding: "10px",
        borderRadius: "20px",
        margin: "auto 0px",
        boxShadow: "0px 5px 10px #d3d3e6",
      }}
    >
      <Bar data={data} options={options} />
    </div>
  );
}
