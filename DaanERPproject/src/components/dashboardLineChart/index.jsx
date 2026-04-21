import { LineChart } from "@mui/x-charts/LineChart";

export default function MarkOptimization() {
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
      <p
        style={{
          fontWeight: "bold",
          fontSize: "13px",
          color: "#575757",
          textAlign: "center",
          padding: "10px 0px",
        }}
      >
        Weekly Occupacy Chart
      </p>
      <LineChart
        xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]}
        series={[
          {
            data: [2, 3, 5.5, 8.5, 1.5, 5, 1, 4, 3, 8],
            showMark: ({ index }) => index % 2 === 0,
          },
        ]}
        width={580}
        height={280}
      />
    </div>
  );
}
