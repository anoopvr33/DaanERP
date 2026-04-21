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
import LoadingItem from "../../components/Elements/Loading";
import ErrorPage from "../../components/Elements/Error";

const option2 = Hotels()
  ? Hotels().map((i) => ({
      value: i,
      label: i.charAt(0).toUpperCase() + i.slice(1),
    }))
  : [];

const Booking = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
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
    console.log("booking datas", data);

    dispatch(getBookingData(data));
  };

  useEffect(() => {
    // console.log("my booking data", sort);
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
                    setData({ ...data, hotels: Hotels() ? Hotels() : [] });
                    return;
                  }
                  setData({ ...data, hotels: selected });
                }}
                isMulti
                options={option2}
                prevMonthDate={data.from_date}
                prevOnchange={(e) =>
                  setData({ ...data, from_date: e.target.value })
                }
                yesterday={data.to_date}
                yesOnchange={(e) =>
                  setData({ ...data, to_date: e.target.value })
                }
                // child={"Filter"}
              />
              <FormItems
                onChange={(e) =>
                  setData({ ...data, filter_method: e.target.value })
                }
                option={[
                  { name: "Booking Date", value: "booking" },
                  { name: "Check In", value: "checkin" },
                  { name: "Check Out", value: "checkout" },
                  { name: "Stay Date", value: "stay" },
                ]}
                element="select"
              ></FormItems>
              <Button onClick={onFilter} child={"Filter"}></Button>

              <Button
                onClick={() => setOpen(!open)}
                className={"booking-add"}
                child={open ? "Close" : "Add"}
              ></Button>
            </div>
          </div>

          {open && <BookingAdd></BookingAdd>}
          {loading ? (
            <LoadingItem />
          ) : error ? (
            <ErrorPage />
          ) : (
            <BookingTable></BookingTable>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;
