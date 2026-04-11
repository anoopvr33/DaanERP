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
import { Hotels } from "../../utils";
import Filter from "../../components/Elements/Filter";

const option2 = Hotels()
  ? Hotels().map((i) => ({
      value: i,
      label: i.charAt(0).toUpperCase() + i.slice(1),
    }))
  : [];

const Booking = () => {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("booking");



  const dispatch = useDispatch();

  const today = new Date();

  // Yesterday
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // Same date previous month
  const prevMonth = new Date(today);
  prevMonth.setMonth(today.getMonth() - 1);

  // Format function
  const formatDate = (d) => d.toISOString().split("T")[0];

  const formattedYesterday = formatDate(yesterday);
  const formattedPrevMonth = formatDate(prevMonth);

  // React state example
  const [yesterdayDate, setYesterdayDate] = useState(formattedYesterday);
  const [prevMonthDate, setPrevMonthDate] = useState(formattedPrevMonth);

  const [data, setData] = useState({
    hotels: Hotels(),
    from_date: prevMonthDate,
    to_date: yesterdayDate,
    filter_method: sort,
  });

  const onFilter = () => {
    console.log("jjkkkjk", data);

    dispatch(getBookingData(data));
  };

  useEffect(() => {
    dispatch(getBookingData(data));
  }, []);

  return (
    <div className="booking">
      <div className="flex common-flex">
        <SidebarTwo></SidebarTwo>
        <div className="elements common-element">
          <Navbar></Navbar>
          <div className="h2-sub">
            <h2>Booking Management</h2>
            {/* <p>lsad{formatted}</p> */}
            <div className="flex-1">
              <Filter
                onChange={(selected) => {
                  // if (!selected) return setHotel([]);
                  if (!selected || selected.length === 0) {
                    setData({ ...data, hotels: option2 });
                    return;
                  }
                  setData({ ...data, hotels: selected });
                }}
                isMulti
                options={option2}
                prevMonthDate={prevMonthDate}
                prevOnchange={(e) => setPrevMonthDate(e.target.value)}
                yesterday={yesterdayDate}
                yesOnchange={(e) => setYesterdayDate(e.target.value)}
                // child={"Filter"}
              />

              <FormItems
                onChange={(e) => setSort(e.target.value)}
                option={[
                  { name: "Booking Date", value: "booking" },
                  { name: "Check In", value: "checkin" },
                  { name: "Check Out", value: "checkout" },
                  { name: "Stay Date", value: "stay" },
                ]}
                element="select"
              ></FormItems>
              <Button onClick={onFilter} child={"Filter"}></Button>
              {/* <Button
                onClick={() => setOpen(!open)}
                className={"booking-add"}
                child={open ? "Close" : "Add"}
              ></Button> */}
            </div>
          </div>

          {open && <BookingAdd></BookingAdd>}

          <BookingTable></BookingTable>
        </div>
      </div>
    </div>
  );
};

export default Booking;
