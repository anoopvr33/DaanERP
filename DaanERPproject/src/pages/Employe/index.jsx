import React, { useEffect, useState } from "react";
import Button from "../../components/Elements/button";
import CustomerTable from "../../components/CustomerTable";
import Chart from "../../components/dashboardGraph";
import FormItems from "../../components/Elements/formItems";
// import MyBarChart from "../../components/dashboardGraph";
// import BasicLineChart from "../../components/DashboardGraph";
// import DashResult from "../../components/dashboardResult";
import Navbar from "../../components/Elements/navbar";
import "./style.css";
import BookingTable from "../../components/bookingTable";
import BookingAdd from "../../components/bookingAdd";
import { useDispatch } from "react-redux";
import { getBookingData } from "../../redux/bookingSlice";
import SidebarTwo from "../../components/Elements/sidebartwo";
import EmployeeAdd from "../../components/EmployeAdd";
import EmployeeTable from "../../components/EmployeTable";
import { Hotels } from "../../utils";

const Employee = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({ year: "2026", month: "", day: "" });
  const dispatch = useDispatch();

  // const hotels = JSON.parse(localStorage.getItem("hotel"));
  const Select = ["Select Hotel", "Daan Lux", "Daan Amabalath", "Daan Hotek"];
  const Year = ["Select Year", 2026, 2027, 2028];
  const month = ["Search Name", 2, 3, 6, 12];
  // const date = ["Select Date", 10, 11, 12];

  const onFilter = () => {
    console.log("jjkkkjk", data);

    // dispatch(getBookingData(data));
  };

  useEffect(() => {
    // dispatch(getBookingData(data));
  }, []);

  return (
    <div className="booking">
      <div className="flex common-flex">
        <SidebarTwo></SidebarTwo>
        <div className="elements common-element">
          <Navbar></Navbar>
          <h2>
            User Management <br /> <br />
            <div className="flex-1">
              <FormItems
                element={"select"}
                option={["All Hotels", ...(Hotels() ? Hotels() : "")]}
                onChange={(e) => setData(e.target.value)}
                type="date"
              />

              <FormItems
                onChange={(e) =>
                  setData({ ...data, month: Number(e.target.value) })
                }
                placeholder={"Search users"}
                // option={month}
                // element=""
              ></FormItems>

              <Button onClick={onFilter} child={"Filter"}></Button>
              <Button
                onClick={() => setOpen(!open)}
                className={"booking-add"}
                child={open ? "Close" : "Add"}
              ></Button>
            </div>
          </h2>
          {/* <p className="line">.</p> */}

          {open && <EmployeeAdd></EmployeeAdd>}

          <EmployeeTable></EmployeeTable>
        </div>
      </div>
    </div>
  );
};

export default Employee;
