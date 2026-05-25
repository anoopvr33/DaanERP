import React, { useEffect, useMemo, useState } from "react";
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
import { useNavigate } from "react-router-dom";

const Booking = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [dayData, setDaydata] = useState(null);
  const [sort, setSort] = useState("booking");

  const navigate = useNavigate();
  const [hotelOptions, setHotelOptions] = useState([]);

  const dispatch = useDispatch();

  const today = new Date();

  // Yesterday
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // Same date previous month
  const prevMonth = new Date(today);
  prevMonth.setDate(today.getDate() - 7);

  // Format function
  const formatDate = (d) => d.toISOString().split("T")[0];

  const formattedYesterday = formatDate(yesterday);
  const formattedPrevMonth = formatDate(prevMonth);

  // React state example
  const [yesterdayDate, setYesterdayDate] = useState(formattedYesterday);
  const [prevMonthDate, setPrevMonthDate] = useState(formattedPrevMonth);

  const [data, setData] = useState({
    hotels: [],
    from_date: prevMonthDate,
    to_date: yesterdayDate,
    filter_method: sort,
  });

  // Submit filter data
  const onFilter = () => {
    console.log("booking datas", data);

    dispatch(getBookingData(data));
  };

  // get data by default

  useEffect(() => {
    console.log("triggered");
    if (data?.hotels?.length === 0) return;

    dispatch(getBookingData(data));
  }, [data.hotels]);

  // get hotels from login and store in useState

  useEffect(() => {
    const hotels = Hotels();
    if (hotels.length === 0 || !hotels) {
      navigate("/login");
    }
    console.log("hotelsss", hotels);

    if (hotels && hotels.length > 0) {
      const formatted = hotels.map((i) => ({
        value: i,
        label: i.charAt(0).toUpperCase() + i.slice(1),
      }));

      setHotelOptions(formatted); // initialize selection
      setData({ ...data, hotels: formatted.map((i) => i.value) });
    }
  }, []);

  // find length of numbers between days

  useEffect(() => {
    const diffInMs =
      new Date(data.to_date).getTime() - new Date(data.from_date).getTime();

    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    setDaydata(diffInDays);
  }, [toggle]);

  return (
    <div className="booking">
      <div className="flex common-flex">
        <SidebarTwo></SidebarTwo>
        <div className="elements common-element">
          <Navbar placeholder={"Search Name, ID, Mob No ..."}></Navbar>
          <div className="h2-sub">
            <h2>Booking Management</h2>

            <div className="flex-1">
              <Filter
                onChange={(selected) => {
                  // if (!selected) return setHotel([]);
                  if (!selected || selected.length === 0) {
                    setData({ ...data, hotels: Hotels() ? Hotels() : [] });
                    return;
                  }
                  setData({ ...data, hotels: selected.map((i) => i.value) });
                }}
                isMulti
                placeholder={"All Hotels"}
                options={hotelOptions}
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
                labelData="Sort"
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
              <Button
                onClick={() => (onFilter(), setToggle(!toggle))}
                child={"Filter"}
              ></Button>

              <Button
                onClick={() => setOpen(!open)}
                className={"booking-add"}
                child={open ? "Close" : "New Booking+"}
              ></Button>
            </div>
          </div>

          {open && <BookingAdd></BookingAdd>}
          {loading ? (
            <LoadingItem />
          ) : error ? (
            <ErrorPage />
          ) : (
            <>
              {/* <p>Showing {dayData} days result</p> */}
              <BookingTable SortedDays={dayData}></BookingTable>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;
