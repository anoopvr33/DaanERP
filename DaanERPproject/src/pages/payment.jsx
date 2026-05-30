import { useEffect, useState } from "react";
import Navbar from "../components/Elements/navbar";
import SidebarTwo from "../components/Elements/sidebartwo";
import PaymentTabs from "../components/paymentTabs";
import { Hotels } from "../utils";
import Filter from "../components/Elements/Filter";
import ErrorPage from "../components/Elements/Error";
import LoadingItem from "../components/Elements/Loading";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  // const [date, setDate] = useState("");
  const navigate = useNavigate();
  const [hotelData, setHotelData] = useState([]);
  const [hotelOptions, setHotelOptions] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [loading] = useState(false);
  const [error] = useState(false);

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

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHotelOptions(formatted);
      setHotelData(formatted); // initialize selection
    }
  }, [navigate]);

  return (
    <div className="daan">
      <div className="flex common-flex">
        <SidebarTwo></SidebarTwo>
        <div className="elements common-element">
          <Navbar></Navbar>
          <div className="h2-sub">
            <h2>Payment Management</h2>
            <div className="flex-1">
              <Filter
                onChange={(selected) => {
                  // if (!selected) return setHotel([]);
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
            <PaymentTabs
              prevmonth={prevMonthDate}
              yesterday={yesterdayDate}
              hotelsArray={hotelData.map((i) => i.value)}
              trigger={trigger}
            ></PaymentTabs>
          )}

          {/* <CustomerTable></CustomerTable> */}
        </div>
      </div>
    </div>
  );
};

export default Payment;
