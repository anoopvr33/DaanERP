import "./style.css";
import {
  ChartArea,
  ChartBarIncreasing,
  ChartBarStackedIcon,
  Donut,
  LineChart,
} from "lucide-react";
// import {RiDonutChartLine}

const DashboardPrev = ({ data }) => {
  return (
    <div className="dash-prev">
      <div className="sub-1">
        {/* <i>
          <ChartArea></ChartArea>
        </i> */}
        <span>{data?.yestarday_occupancy}</span>
        <h2>Yesterday Occupancy</h2>
      </div>
      <div className="sub-1">
        {/* <i>
          <ChartArea></ChartArea>
        </i> */}
        <span>{data?.last_month_occupancy}</span>
        <h2>Last Month Occupancy</h2>
      </div>
      <div className="sub-1">
        {/* <i>
          <LineChart />
        </i> */}
        <span>{data?.yesterday_revenue}</span>
        <h2>Yesterday Revenue</h2>
      </div>
      <div className="sub-1">
        {/* <i>
          <LineChart />
        </i> */}
        <span>{data?.last_month_revenue}</span>
        <h2>Last Month Revenue</h2>
      </div>
    </div>
  );
};

export default DashboardPrev;
