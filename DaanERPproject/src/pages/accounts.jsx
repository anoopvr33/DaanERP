import { useMemo, useState } from "react";
import Navbar from "../components/Elements/navbar";
import SidebarTwo from "../components/Elements/sidebartwo";
import AccountsTabs from "../components/accountsTabs";
import { formatHotel } from "../utils";
import Filter from "../components/Elements/Filter";
import LoadingItem from "../components/Elements/Loading";
import ErrorPage from "../components/Elements/Error";
import { FormattedMonths } from "../components/Elements/yesterdayDate";

const Accounts = () => {
  // hotel array for filter and api call
  const formattedHotels = useMemo(() => formatHotel() || [], []);

  const [hotelOptions] = useState(formattedHotels);
  const [hotelData, setHotelData] = useState(formattedHotels);
  const [trigger, setTrigger] = useState(false);
  const [loading] = useState(false);
  const [error] = useState(false);

  const { formattedYesterday, formattedPrevMonth } = FormattedMonths();

  // date formatting for yesterday and previous month
  const [yesterdayDate, setYesterdayDate] = useState(formattedYesterday);
  const [prevMonthDate, setPrevMonthDate] = useState(formattedPrevMonth);

  return (
    <div className="daan">
      <div className="flex common-flex">
        {/* // ------------------------------------------ sidebar component */}
        <SidebarTwo></SidebarTwo>
        <div className="elements common-element">
          {/* // ------------------------------------------ Navbar component */}
          <Navbar></Navbar>

          {/* // ------------------------------------------ Filter component */}
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

          {/* // ------------------------------------------ Conditional rendering for loading, error and accounts tabs */}
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
        </div>
      </div>
    </div>
  );
};

export default Accounts;
