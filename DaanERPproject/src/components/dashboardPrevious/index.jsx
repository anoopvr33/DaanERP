import "./style.css";

const DashboardPrev = ({ data }) => {
  return (
    <div className="dash-prev">
      <div className="sub-1">
        <h2>Yesturday</h2>
        <h1>
          Occupancy <span>{data.yestarday_occupancy}</span>
        </h1>
      </div>
      <div className="sub-1">
        <h2>Last Month Occupancy</h2>
        <h1>
          Occupancy <span>{data.last_month_occupancy}</span>{" "}
        </h1>
      </div>
    </div>
  );
};

export default DashboardPrev;
