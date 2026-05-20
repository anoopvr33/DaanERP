import { useEffect, useState } from "react";
import "./style.css";
import { API } from "../../utils/axios";

const DashResult = ({ data }) => {
  return (
    <div className="dash-result">
      <div style={{ display: "flex" }}>
        <i class="fa-solid fa-suitcase-rolling"></i>
        <span>
          <h1>{data.booking_count}</h1>
          <b> Bookings</b>
        </span>
      </div>
      {/* <div>
        <h1>{data.room_result}</h1>
        <b> Room Result</b>
      </div> */}
      <div>
        <i class="fa-brands fa-cash-app"></i>
        <span>
          <h1>{data.arr}</h1>
          <b> ARR</b>
        </span>
      </div>
      <div>
        <i class="fa-solid fa-bed"></i>
        <span>
          <h1>{data.room_nights}</h1>
          <b> Room Night</b>
        </span>
      </div>
      <div>
        <i class="fa-solid fa-door-open"></i>
        <span>
          <h1>{data.room_count}</h1>
          <b> Room Count</b>
        </span>
      </div>
      <div>
        {/* <h1>{data.unique_room}</h1> */}
        <i class="fa-solid fa-chart-pie"></i>
        <span>
          <h1>{data.room_occupancy}</h1>
          <b> Room Occupancy</b>
        </span>
      </div>
      {/* <div>
        <h1>{data?.revenu_count?.total_amount || "NaN"}</h1>
        <b>Total Revenue</b>
      </div> */}
    </div>
  );
};

export default DashResult;
