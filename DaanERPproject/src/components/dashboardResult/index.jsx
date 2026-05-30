import { useEffect, useState } from "react";
import "./style.css";
import { API } from "../../utils/axios";
import { IndianRupee, Backpack } from "lucide-react";
import { LucideBedDouble, DoorOpenIcon, ChartPie } from "lucide-react";

const DashResult = ({ data }) => {
  return (
    <div className="dash-result">
      <div style={{ display: "flex" }}>
        {/* <i data-lucide="indian-rupee" class="fa-solid fa-suitcase-rolling"></i> */}
        <Backpack></Backpack>
        <span>
          <h1>{data?.booking_count}</h1>
          <b> Bookings</b>
        </span>
      </div>
      {/* <div>
        <h1>{data.room_result}</h1>
        <b> Room Result</b>
      </div> */}
      <div>
        <IndianRupee></IndianRupee>
        <span>
          <h1>{data?.arr}</h1>
          <b> ARR</b>
        </span>
      </div>
      <div>
        {/* <MdOutlineBed></MdOutlineBed> */}

        <LucideBedDouble></LucideBedDouble>
        <span>
          <h1>{data?.room_nights}</h1>
          <b> Room Night</b>
        </span>
      </div>
      <div>
        <DoorOpenIcon></DoorOpenIcon>
        <span>
          <h1>{data?.room_count}</h1>
          <b> Room Count</b>
        </span>
      </div>
      <div>
        {/* <h1>{data.unique_room}</h1> */}
        <ChartPie></ChartPie>
        <span>
          <h1>{data?.room_occupancy}</h1>
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
