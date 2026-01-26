import React, { useEffect, useState } from "react";
import Button from "../../components/button";
import CustomerTable from "../../components/CustomerTable";
import Chart from "../../components/dashboardGraph";
import FormItems from "../../components/formItems";
// import MyBarChart from "../../components/dashboardGraph";
// import BasicLineChart from "../../components/DashboardGraph";
// import DashResult from "../../components/dashboardResult";
import Navbar from "../../components/navbar";
import SideBar from "../../components/sidebar";

import "./style.css";
import BookingTable from "../../components/bookingTable";
import BookingAdd from "../../components/bookingAdd";
import { useDispatch } from "react-redux";
import { getBookingData } from "../../redux/bookingSlice";
import SidebarTwo from "../../components/sidebartwo";

const Booking = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({ year: "2026", month: "", day: "" });
  const dispatch = useDispatch();

  const Select = ["Select Hotel", "Daan Lux", "Daan Amabalath", "Daan Hotek"];
  const Year = ["Select Year", "2026", "2027", "2028"];
  const month = ["Select Month", "1", "2", "3"];
  const date = ["Select Date", "1", "2", "3"];

  const onFilter = () => {
    dispatch(getBookingData(data));
  };

  useEffect(() => {
    dispatch(getBookingData(data));
  }, []);

  return (
    <div className="booking">
      <div className="flex">
        <SidebarTwo></SidebarTwo>
        <div className="elements">
          <Navbar></Navbar>
          <h2>Booking Management</h2>
          {/* <p className="line">.</p> */}
          <div className="flex-1">
            <FormItems
              onChange={(e) => setData({ ...data, year: e.target.value })}
              option={Select}
              element="select"
            ></FormItems>
            <FormItems
              onChange={(e) => setData({ ...data, year: e.target.value })}
              option={Year}
              element="select"
            ></FormItems>
            <FormItems
              onChange={(e) => setData({ ...data, month: e.target.value })}
              option={month}
              element="select"
            ></FormItems>
            <FormItems
              onChange={(e) => setData({ ...data, day: e.target.value })}
              option={date}
              element="select"
            ></FormItems>
            <Button onClick={onFilter} child={"Filter"}></Button>
            <Button
              onClick={() => setOpen(!open)}
              className={"booking-add"}
              child={open ? "Close" : "Add"}
            ></Button>
          </div>
          {open && <BookingAdd></BookingAdd>}

          <BookingTable></BookingTable>
        </div>
      </div>
    </div>
  );
};

export default Booking;
