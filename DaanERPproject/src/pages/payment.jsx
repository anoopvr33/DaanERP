import { useMemo, useState } from "react";
import Navbar from "../components/Elements/navbar";
import SidebarTwo from "../components/Elements/sidebartwo";
import PaymentTabs from "../components/paymentTabs";
import { formatHotel } from "../utils";
import Filter from "../components/Elements/Filter";
import ErrorPage from "../components/Elements/Error";
import LoadingItem from "../components/Elements/Loading";
import { FormattedMonths } from "../components/Elements/yesterdayDate";

const Payment = () => {
  const formattedHotels = useMemo(() => formatHotel() || [], []);

  const [hotelData, setHotelData] = useState(formattedHotels);
  const [hotelOptions] = useState(formattedHotels);
  const [trigger, setTrigger] = useState(false);
  const [loading] = useState(false);
  const [error] = useState(false);

  const { formattedYesterday, formattedPrevMonth } = FormattedMonths();

  // React state example
  const [yesterdayDate, setYesterdayDate] = useState(formattedYesterday);
  const [prevMonthDate, setPrevMonthDate] = useState(formattedPrevMonth);

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
                placeholder={"All Hotels"}
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
