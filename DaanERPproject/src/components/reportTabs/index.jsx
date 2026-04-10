import "./style.css";
import { useEffect, useState } from "react";
import ReportAuditTab from "./reportAudit";
import ReportRevenueTab from "./reportRevenue";
import ReportTaxTab from "./reportTax";
import ReportTotalTab from "./reportTotal";
import { API, getCookie } from "../../utils/axios";
import { Hotels } from "../../utils";

const ReportTabs = ({ yesterday, prevmonth, hotel }) => {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(false);

  const POS = {
    borderRadius: "20px 20px 0px 0px",
    background: tab == 0 && "    hsl(0, 0%, 100%)",
    color: tab == 0 && "#386f74",
    borderBottomRightRadius: tab - 1 == 0 && "20px",
    borderBottomLeftRadius: tab + 1 == 0 && "20px",
  };

  const Daily = {
    borderRadius: "20px 20px 0px 0px",

    background: tab == 1 && "    hsl(0, 0%, 100%)",
    color: tab == 1 && "#69af99",
    borderBottomLeftRadius: tab + 1 == 1 && "20px",
    borderBottomRightRadius: tab - 1 == 1 && "20px",
  };

  const Hotel = {
    borderRadius: "20px 20px 0px 0px",

    background: tab == 2 && "   hsl(0, 0%, 100%)",
    color: tab == 2 && "#69af99",
    borderBottomLeftRadius: tab + 1 == 2 && "20px",
    borderBottomRightRadius: tab - 1 == 2 && "20px",
  };

  const Vendor = {
    borderRadius: "20px 20px 0px 0px",
    // padding: " 0px 20px",
    background: tab == 3 && "  hsl(0, 0%, 100%)",
    color: tab == 3 && "#69af99",
    borderBottomLeftRadius: tab + 1 == 3 && "20px",
    borderBottomRightRadius: tab - 1 == 3 && "20px",
  };

  const None = {
    borderRadius: "20px 20px 0px 0px",
    background: "transparent",
    borderBottomLeftRadius: tab + 1 == 4 && "20px",
    borderBottomRightRadius: tab - 1 == 4 && "20px",
  };

  const TabArray = [
    {
      id: 0,
      name: "Night Audit",
      link: "pos",
      style: POS,
    },
    {
      id: 1,
      name: "Revenue Details ",
      link: "daily",
      style: Daily,
    },
    {
      id: 2,
      name: "Total Reciepts",
      link: "hotel",
      style: Hotel,
    },
    {
      id: 3,
      name: "Gst Bookings",
      link: "vendor",
      style: Vendor,
    },
    {
      id: 4,
      name: null,
      link: null,
      style: None,
    },
  ];

  const [audit, setAudit] = useState({ name: [], current: [], upto: [] });
  const [revenue, setRevenue] = useState([]);

  const GetAudit = async () => {
    console.log("report date format", prevmonth, yesterday, hotel);

    try {
      const response = await API.post(
        "/reports/get_nightaudit_report/",
        {
          hotels: hotel,
          from_date: prevmonth,
          to_date: yesterday,
        },
        {
          withCredentials: true,
          headers: {
            "X-CSRFToken": getCookie("csrftoken"),
          },
        },
      );
      console.log("daily resssss", response);
      const res = response.data.report;

      console.log("kakakaka", res);

      if (response.data.status === "success") {
        setAudit({
          name: ["Room Occupied", "Total Sales", "ARR", "Occupancy"],
          current: [
            res.room_occupied_current_date,
            res.total_sales_amount_current_date,
            res.arr_current_date,
            res.occupancy_current_date,
          ],
          upto: [
            res.room_occupied_between_date,
            res.total_sales_amount_current_date,
            res.arr_between_date,
            res.occupancy_between_date,
          ],
        });
      } else alert("something went wrong please login again");

      setRevenue(res?.revenu_details);
      console.log("reeeaaa", res, res?.revenu_details);
    } catch (error) {
      alert(error, "please login");
    }
  };

  useEffect(() => {
    GetAudit();
    // console.log("fate", formattedDate);
    // eslint(react-hooks/set-state-in-effect)
  }, [yesterday, prevmonth, hotel]);

  useEffect(() => {
    console.log("latest audit", audit);
  }, [audit, revenue]);

  return (
    <div className="acc-tabs">
      <div className="acc-tabs-flex">
        {TabArray.map((item, index) => (
          <p
            style={{
              borderBottomLeftRadius: tab + 1 === index ? "20px" : "0px",
              borderBottomRightRadius: tab - 1 === index ? "20px" : "0px",
            }}
            onClick={() => setTab(index)}
          >
            <text style={item?.style}>{item?.name}</text>
          </p>
        ))}
      </div>
      <div
        style={{ borderRadius: tab === 0 && "0px 20px 20px 20px" }}
        className="acc-tabs-container"
      >
        {tab === 0 && <ReportAuditTab audit={audit}></ReportAuditTab>}
        {tab === 1 && <ReportRevenueTab revenue={revenue}></ReportRevenueTab>}
        {tab === 2 && <ReportTotalTab></ReportTotalTab>}
        {tab === 3 && <ReportTaxTab></ReportTaxTab>}
      </div>
    </div>
  );
};

export default ReportTabs;
