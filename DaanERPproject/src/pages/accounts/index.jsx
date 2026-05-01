import { useEffect, useState } from "react";
import Navbar from "../../components/Elements/navbar";
import "./style.css";
import SidebarTwo from "../../components/Elements/sidebartwo";
import AccountsTabs from "../../components/accountsTabs";
import FormItems from "../../components/Elements/formItems";
import Button from "../../components/Elements/button";
import { Hotels } from "../../utils";
import Filter from "../../components/Elements/Filter";
import LoadingItem from "../../components/Elements/Loading";
import ErrorPage from "../../components/Elements/Error";
import { useNavigate } from "react-router-dom";

// const option2 = Hotels()
//   ? Hotels().map((i) => ({
//       value: i,
//       label: i.charAt(0).toUpperCase() + i.slice(1),
//     }))
//   : [];

const Accounts = () => {
  const navigate = useNavigate();
  const [hotelOptions, setHotelOptions] = useState([]);
  const [hotelData, setHotelData] = useState([]);

  const [trigger, setTrigger] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
  // const [formattedDate2, setDate2] = useState(date.toISOString().split("T")[0]);
  const Select = ["Hotel", "Daan Lux", "Daan Ambalath", "Regency"];
  const Count = ["Sort", "By Date", "More Count", "Less Count", ""];

  useEffect(() => {
    const hotels = Hotels();
    if (hotels.length === 0) {
      navigate("/login");
    }
    console.log("hotelsss", hotels);

    if (hotels && hotels.length > 0) {
      const formatted = hotels.map((i) => ({
        value: i,
        label: i.charAt(0).toUpperCase() + i.slice(1),
      }));

      setHotelOptions(formatted); // initialize selection
      setHotelData(formatted);
    }
  }, []);

  useEffect(() => {
    console.log("Hotels account", hotelData);
  }, [hotelData]);

  return (
    <div className="accounts">
      <div className="flex common-flex">
        <SidebarTwo></SidebarTwo>
        <div className="elements common-element">
          <Navbar></Navbar>
          <div className="h2-sub">
            <h2
              style={{
                margin: 0,
                marginTop: 0,
                padding: 0,
                paddingBottom: "0px",
              }}
            >
              Accounts Management
            </h2>
            <div className="flex-1">
              <Filter
                onChange={(selected) => {
                  // if (!selected) return setHotelData([]);
                  if (!selected || selected.length === 0) {
                    setHotelData(hotelOptions);
                    return;
                  }
                  setHotelData(selected);
                }}
                isMulti
                options={hotelOptions}
                prevMonthDate={prevMonthDate}
                prevOnchange={(e) => setPrevMonthDate(e.target.value)}
                yesterday={yesterdayDate}
                yesOnchange={(e) => setYesterdayDate(e.target.value)}
                child={"Filter"}
                onClick={() => setTrigger(!trigger)}
              />
            </div>
          </div>
          {loading ? (
            <LoadingItem />
          ) : error ? (
            <ErrorPage />
          ) : (
            <AccountsTabs
              trigger={trigger}
              prevMonth={prevMonthDate}
              dateset={yesterdayDate}
              hotels={hotelData.map((i) => i.value)}
            ></AccountsTabs>
          )}

          {/* <CustomerTable></CustomerTable> */}
        </div>
      </div>
    </div>
  );
};

export default Accounts;
