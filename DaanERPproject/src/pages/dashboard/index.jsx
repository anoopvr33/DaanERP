import { useEffect, useState } from "react";
import DashboardFilter from "../../components/dashboardFilter";
import Chart from "../../components/dashboardGraph";
import DashboardPrev from "../../components/dashboardPrevious";
// import BasicLineChart from "../../components/DashboardGraph";
import DashResult from "../../components/dashboardResult";
import Navbar from "../../components/Elements/navbar";
import SidebarTwo from "../../components/Elements/sidebartwo";

import "./style.css";
import { API, getCookie } from "../../utils/axios";
import FormItems from "../../components/Elements/formItems";
import Button from "../../components/Elements/button";
import { Hotels } from "../../utils";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const today = new Date();
  const [hotelData, setHotelData] = useState(Hotels());
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

  const GetPos = async () => {
    // console.log("maiaaa daarf", yesterdayDate, prevMonthDate);

    try {
      const response = await API.post(
        "/dashboard/get_report/",
        {
          hotels: hotelData,
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
      } else alert("something went wrong getting Dashboard data");
    } catch (error) {
      // alert("Something wrong or Please Login");
      navigate("/login");
    }
  };

  // if (!Hotels) {
  //   window.location.reload();
  // }

  useEffect(() => {
    if (Hotels()) {
      GetPos();
    } else {
      navigate("/login");
    }

    console.log("fate");
    // eslint(react-hooks/set-state-in-effect)
  }, [yesterdayDate]);

  // useEffect(() => {}, [formattedDate2]);

  if (!data) {
    return <div className="dashboard">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <div className="flex common-flex">
        <SidebarTwo></SidebarTwo>
        <div className="elements common-element">
          <Navbar></Navbar>
          <div className="sub-1">
            <FormItems
              option={["All Hotels", ...(Hotels() ? Hotels() : "No Data")]}
              onChange={(e) =>
                setHotelData(
                  e.target.value === "All Hotels" ? Hotels() : [e.target.value],
                )
              }
              type="text"
              element="select"
            />
            <span> </span>
            {/* <br /> */}
            <label htmlFor="">
              <b>From</b>{" "}
            </label>
            <FormItems
              value={prevMonthDate}
              onChange={(e) => setPrevMonthDate(e.target.value)}
              type="date"
            />
            <span> </span>
            <label htmlFor="">
              <b>to</b>
            </label>
            <FormItems
              value={yesterdayDate}
              onChange={(e) => setYesterdayDate(e.target.value)}
              type="date"
            />

            <span> </span>
            <Button onClick={GetPos} child={"FIlter"}></Button>
          </div>
          <DashResult data={data}></DashResult>
          <div className="flex-2">
            <Chart></Chart>
            <DashboardPrev data={data}></DashboardPrev>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
