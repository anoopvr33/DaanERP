/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import Button from "../components/Elements/button";
import FormItems from "../components/Elements/formItems";
import Navbar from "../components/Elements/navbar";
import BookingTable from "../components/bookingTable";
import BookingAdd from "../components/bookingAdd";
import { useDispatch } from "react-redux";
import { getBookingData } from "../redux/bookingSlice";
import SidebarTwo from "../components/Elements/sidebartwo";
import { formatHotel, Hotels } from "../utils";
import Filter from "../components/Elements/Filter";
import LoadingItem from "../components/Elements/Loading";
import ErrorPage from "../components/Elements/Error";
import { FormattedMonths } from "../components/Elements/yesterdayDate";

const Booking = () => {
  const [loading] = useState(false);
  const [error] = useState(false);
  const [open, setOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [dayData, setDaydata] = useState(null);
  const [sort] = useState("booking");

  const formattedHotels = useMemo(() => formatHotel() || [], []);

  const [hotelOptions] = useState(formattedHotels);

  const dispatch = useDispatch();

  const { formattedYesterday, formattedPrevMonth } = FormattedMonths();

  // React state example
  const [yesterdayDate] = useState(formattedYesterday);
  const [prevMonthDate] = useState(formattedPrevMonth);

  const [data, setData] = useState({
    hotels: formattedHotels.map((i) => i.value) || [],
    from_date: prevMonthDate,
    to_date: yesterdayDate,
    filter_method: sort,
  });

  // Submit filter data
  const onFilter = () => {
    dispatch(getBookingData(data));
  };

  // get data by default
  useEffect(() => {
    if (data?.hotels?.length === 0) return;

    dispatch(getBookingData(data));
  }, [data.hotels]);

  // find length of numbers between days

  useEffect(() => {
    const diffInMs =
      new Date(data.to_date).getTime() - new Date(data.from_date).getTime();

    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    setDaydata(diffInDays);
  }, [toggle]);

  return (
    <div className="daan">
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
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "end",
              justifyContent: "space-between",
            }}
          >
            <p>
              Showing results of <b>{dayData + 1 || 1}</b> Days
            </p>
            <Button
              onClick={() => setOpen(!open)}
              className={"booking-add"}
              child={open ? "Close" : "New Booking +"}
            ></Button>
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
