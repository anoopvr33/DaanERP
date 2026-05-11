import { LineChart } from "@mui/x-charts/LineChart";

export default function MarkOptimization({ data }) {
  console.log("my line cart", data);

  const Occupancy = data?.map((i) => i.occupancy);

  // last 6 days
  const last6Days = data?.slice(-6);

  // map for chart
  const xData = last6Days?.map((item) => item.date);
  const yData = last6Days?.map((item) => item.occupancy);

  if (!yData) {
    return;
  }
  const max = Math.max(...yData);
  const min = 0;

  // 👇 choose exact number of ticks
  const tickCount = 6;

  // raw step
  const step = (max - min) / (tickCount - 1);

  // OPTIONAL: round step for cleaner numbers
  const roundStep = (value) => {
    const magnitude = Math.pow(10, Math.floor(Math.log10(value)));
    return Math.ceil(value / magnitude) * magnitude;
  };

  const niceStep = roundStep(step);

  // adjust max based on rounded step
  const roundedMax = niceStep * (tickCount - 1);

  // generate ticks
  const yTicks = Array.from({ length: tickCount }, (_, i) => i * niceStep);

  console.log("line occupancy", Occupancy);

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
        xAxis={[{ data: xData, scaleType: "point" }]}
        yAxis={[
          {
            min: 0,
            max: roundedMax,
            ticks: yTicks,
          },
        ]}
        series={[{ data: yData }]}
        width={750}
        height={280}
      />
    </div>
  );
}
