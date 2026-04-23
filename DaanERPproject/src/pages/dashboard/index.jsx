import { useEffect, useState } from "react";
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
import { Hotels } from "../../utils";
import { useNavigate } from "react-router-dom";
import Filter from "../../components/Elements/Filter";
import LoadingItem from "../../components/Elements/Loading";
import ErrorPage from "../../components/Elements/Error";
import MarkOptimization from "../../components/dashboardLineChart";
import ExpenseChart from "../../components/dashboardExpenseChart";

const option2 = Hotels()
  ? Hotels().map((i) => ({
      value: i,
      label: i.charAt(0).toUpperCase() + i.slice(1),
    }))
  : [];

const Dashboard = () => {
  const today = new Date();
  const [hotelData, setHotelData] = useState(option2);

  const navigate = useNavigate();

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

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const GetPos = async () => {
    // console.log("maiaaa daarf", yesterdayDate, prevMonthDate);

    setLoading(true);
    setError(null);

    if (!hotelData || hotelData.length === 0) window.location.reload();

    const SelectedHotel = hotelData.map((i) => i.value);
    console.log("select hoeee", SelectedHotel);

    try {
      const response = await API.post(
        "/dashboard/get_report/",
        {
          hotels: SelectedHotel,
          from_date: prevMonthDate,
          to_date: yesterdayDate,
        },
        {
          withCredentials: true,
          headers: {
            "X-CSRFToken": getCookie("csrftoken"),
          },
        },
      );

      console.log("dashpo res", response);
      if (response.data.status === "success") {
        setData(response.data);
        setLoading(false);
      } else {
        setError(true);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    GetPos();
  }, []);

  return (
    <div className="dashboard">
      <div className="flex common-flex">
        <SidebarTwo></SidebarTwo>
        <div className="elements common-element">
          <Navbar></Navbar>

          {/* <FormItems
              option={["All Hotels", ...(Hotels() ? Hotels() : "No Data")]}
              onChange={(e) =>
                setHotelData(
                  e.target.value === "All Hotels" ? Hotels() : [e.target.value],
                )
              }
              type="text"
              element="select"
            /> */}
          {/* <Select
            onChange={(selected) => {
              if (!selected) return setHotelData([]);
              if (!selected || selected.length === 0) {
                setHotelData(option2);
                return;
              }
              setHotelData(selected);
            }}
            // defaultValue={hotelData}

            isMulti
            placeholder={"All Hotels"}
            options={option2}
          ></Select> */}
          <div className="h2-sub">
            <h2>Dashboard</h2>
            <div className="flex-1">
              <Filter
                onChange={(selected) => {
                  // if (!selected) return setHotelData([]);
                  if (!selected || selected.length === 0) {
                    setHotelData(option2);
                    return;
                  }
                  setHotelData(selected);
                }}
                isMulti
                options={option2}
                prevMonthDate={prevMonthDate}
                prevOnchange={(e) => setPrevMonthDate(e.target.value)}
                yesterday={yesterdayDate}
                yesOnchange={(e) => setYesterdayDate(e.target.value)}
                onClick={GetPos}
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
                <Chart data={data.monthly_sales}></Chart>
                <MarkOptimization
                  data={data.daily_occupancy}
                ></MarkOptimization>
              </div>
              <div className="flex-2">
                <DashboardPrev data={data}></DashboardPrev>
                <ExpenseChart data={data.monthly_expense}></ExpenseChart>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
