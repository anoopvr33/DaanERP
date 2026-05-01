import { useEffect, useState } from "react";
import "./style.css";
import { API } from "../../utils/axios";

const DashResult = ({ data }) => {
  return (
    <div className="dash-result">
      <div>
        <h1>{data.booking_count}</h1>
        <b> Bookings</b>
      </div>{" "}
      {/* <div>
        <h1>{data.room_result}</h1>
        <b> Room Result</b>
      </div> */}
      <div>
        <h1>{data.arr}</h1>
        <b> ARR</b>
      </div>
      <div>
        <h1>{data.room_nights}</h1>
        <b> Room Night</b>
      </div>
      <div>
        <h1>{data.room_count}</h1>
        <b> Room Count</b>
      </div>
      <div>
        {/* <h1>{data.unique_room}</h1> */}
        <h1>{data.room_occupancy}</h1>
        <b> Room Occupancy</b>
      </div>
      {/* <div>
        <h1>{data?.revenu_count?.total_amount || "NaN"}</h1>
        <b>Total Revenue</b>
      </div> */}
    </div>
  );
};

export default DashResult;
