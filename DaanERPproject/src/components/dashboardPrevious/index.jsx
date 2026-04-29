import "./style.css";

const DashboardPrev = ({ data }) => {
  return (
    <div className="dash-prev">
      <div className="sub-1">
        <span>{data.yestarday_occupancy}</span>
        <h2>Yesturday Occupancy</h2>
      </div>
      <div className="sub-1">
        <span>{data.last_month_occupancy}</span>
        <h2>Last Month Occupancy</h2>
      </div>
      <div className="sub-1">
        <span>{data?.yesterday_revenue}</span>
        <h2>Yesturday Revenue</h2>
      </div>
      <div className="sub-1">
        <span>{data?.last_month_revenue}</span>
        <h2>Last Month Revenue</h2>
      </div>
    </div>
  );
};

export default DashboardPrev;
