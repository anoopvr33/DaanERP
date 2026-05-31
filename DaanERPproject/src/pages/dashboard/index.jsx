import { useEffect, useMemo, useState } from "react";
import Chart from "../../components/dashboardGraph";
import DashboardPrev from "../../components/dashboardPrevious";
import DashResult from "../../components/dashboardResult";
import Navbar from "../../components/Elements/navbar";
import SidebarTwo from "../../components/Elements/sidebartwo";
import "./style.css";
import { formatHotel } from "../../utils";
import Filter from "../../components/Elements/Filter";
import LoadingItem from "../../components/Elements/Loading";
import ErrorPage from "../../components/Elements/Error";
import MarkOptimization from "../../components/dashboardLineChart";
import ExpenseChart from "../../components/dashboardExpenseChart";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardData } from "../../redux/dashboardSlice";
import { FormattedMonths } from "../../components/Elements/yesterdayDate";

const Dashboard = () => {
  const dispatch = useDispatch();
  const formattedHotels = useMemo(() => formatHotel() || [], []);

  const [hotelData, setHotelData] = useState(formattedHotels);
  const [hotelOptions] = useState(formattedHotels);
  const [trigger, setTrigger] = useState(false);

  const {
    items: data,
    loading,
    error,
  } = useSelector((state) => state.dashboard);

  const { formattedYesterday, formattedPrevMonth } = FormattedMonths();

  // React state example
  const [yesterdayDate, setYesterdayDate] = useState(formattedYesterday);
  const [prevMonthDate, setPrevMonthDate] = useState(formattedPrevMonth);

  useEffect(() => {
    if (!hotelData.length) return;

    dispatch(
      getDashboardData({
        SelectedHotel: hotelData.map(({ value }) => value),
        prevMonthDate,
        yesterdayDate,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotelData, trigger]);

  return (
    <div className="dashboard">
      <div className="flex common-flex">
        <SidebarTwo></SidebarTwo>
        <div className="elements common-element">
          <Navbar></Navbar>
          <div className="h2-sub">
            <h2>Dashboard</h2>
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
                onClick={() => setTrigger(!trigger)}
                child={"Filter"}
              />
            </div>
          </div>

          {loading ? (
            <LoadingItem />
          ) : error ? (
            <ErrorPage />
          ) : (
            <>
              <DashResult data={data}></DashResult>
              <div className="flex-2">
                <Chart data={data?.monthly_sales}></Chart>
                <ExpenseChart data={data?.monthly_expense}></ExpenseChart>
              </div>
              <div className="flex-2">
                <DashboardPrev data={data}></DashboardPrev>
                <MarkOptimization
                  data={data?.daily_occupancy}
                ></MarkOptimization>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
