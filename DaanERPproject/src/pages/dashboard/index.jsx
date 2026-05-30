import { useEffect, useMemo, useState } from "react";
import DashboardFilter from "../../components/dashboardFilter";
import Chart from "../../components/dashboardGraph";
import DashboardPrev from "../../components/dashboardPrevious";
// import BasicLineChart from "../../components/DashboardGraph";
import DashResult from "../../components/dashboardResult";
import Navbar from "../../components/Elements/navbar";
import SidebarTwo from "../../components/Elements/sidebartwo";
import Select from "react-select";
import "./style.css";
import { API, getCookie } from "../../utils/axios";
import FormItems from "../../components/Elements/formItems";
import Button from "../../components/Elements/button";
import { formatHotel, Hotels } from "../../utils";
import { useNavigate } from "react-router-dom";
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
  const {
    items: data,
    loading,
    error,
  } = useSelector((state) => state.dashboard);

  const [hotelData, setHotelData] = useState(formattedHotels);
  const [hotelOptions] = useState(formattedHotels);
  const [trigger, setTrigger] = useState(false);

  const { formattedYesterday, formattedPrevMonth } = FormattedMonths();

  // React state example
  const [yesterdayDate, setYesterdayDate] = useState(formattedYesterday);
  const [prevMonthDate, setPrevMonthDate] = useState(formattedPrevMonth);

  useMemo(() => {
    if (!hotelData.length) return;

    dispatch(
      getDashboardData({
        SelectedHotel: hotelData.map(({ value }) => value),
        prevMonthDate,
        yesterdayDate,
      }),
    );
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
