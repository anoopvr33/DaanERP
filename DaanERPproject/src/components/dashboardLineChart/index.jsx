import { LineChart } from "@mui/x-charts/LineChart";

export default function MarkOptimization({ data }) {
  console.log("my line cart", data);

  const Occupancy = data?.map((i) => i.occupancy);

  // last 10 days
  const last10Days = data?.slice(-9);

  // map for chart

  const xData = last10Days?.map((item) => item.date);
  const yData = last10Days?.map((item) => item.occupancy);

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
        backgroundImage: "linear-gradient(to right,  #026e7e, #002024 )",
        padding: "10px",
        borderRadius: "20px",
        margin: "0px 0px",
        // boxShadow: "0px 5px 10px #d3d3e6",
      }}
    >
      <p
        style={{
          fontWeight: "bold",
          fontSize: "15px",
          color: "#ffffff",
          textAlign: "center",

          padding: "10px 0px",
        }}
      >
        Daily Occupancy Data
      </p>
      <LineChart
        xAxis={[
          {
            data: xData,
            scaleType: "point",
            tickLabelStyle: {
              fill: "white",
            },
          },
        ]}
        yAxis={[
          {
            min: 0,
            max: roundedMax,
            barGapRatio: 2,
            ticks: yTicks,

            label: "Occupancy",
            labelStyle: {
              fill: "white",
            },
            tickLabelStyle: {
              fill: "white",
            },
          },
        ]}
        series={[{ data: yData, color: "rgb(85, 217, 149)" }]}
        sx={{
          width: "100%",

          "& .MuiChartsAxis-tickLabel": {
            fill: "#f0e6e6",
            fontSize: 12,
          },
        }}
        height={280}
      />
    </div>
  );
}
