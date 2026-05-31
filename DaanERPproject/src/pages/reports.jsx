import { useMemo, useState } from "react";
import Navbar from "../components/Elements/navbar";
import SidebarTwo from "../components/Elements/sidebartwo";
import ReportTabs from "../components/reportTabs";
import { formatHotel } from "../utils";
import Filter from "../components/Elements/Filter";
import LoadingItem from "../components/Elements/Loading";
import ErrorPage from "../components/Elements/Error";
import { FormattedMonths } from "../components/Elements/yesterdayDate";

const Reports = () => {
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
            <h2>Reports</h2>
            <div className="element-sub">
              <Filter
                onChange={(selected) => {
                  if (!selected || selected.length === 0) {
                    setHotelData(hotelOptions);
                    return;
                  }
                  setHotelData(selected);
                }}
                isMulti
                options={hotelOptions}
                placeholder={"All Hotels"}
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
            <ReportTabs
              hotel={hotelData.map((i) => i.value)}
              yesterday={yesterdayDate}
              prevmonth={prevMonthDate}
              trigger={trigger}
            ></ReportTabs>
          )}{" "}
        </div>
      </div>
    </div>
  );
};

export default Reports;
