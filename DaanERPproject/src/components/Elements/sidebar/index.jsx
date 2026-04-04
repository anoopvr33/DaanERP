import { useNavigate, useSearchParams } from "react-router-dom";
import "./style.css";
import { useState } from "react";

const SideBar = () => {
  const page = new URLSearchParams(location.search);
  const tab = page.get("page");
  const navigate = useNavigate();
  const DashColor = {
    background: !tab && "white",
    color: !tab && "#7070a3",
  };
  const CustomColor = {
    background: tab == "customer" && "white",
    color: tab == "customer" && "#7070a3",
  };
  const HotelsColor = {
    background: tab == "hotels" && "white",
    color: tab == "hotels" && "#7070a3",
  };
  const BookingColor = {
    background: tab == "booking" && "white",
    color: tab == "booking" && "#7070a3",
  };

  return (
    <div className="sidebar">
      {/* <h1>Daan ERP</h1> */}
      <ul>
        <li style={DashColor} onClick={() => navigate("/")}>
          Dashboard
        </li>
        <li
          style={BookingColor}
          onClick={() => navigate("/booking/?page=booking")}
        >
          Booking
        </li>
        <li style={HotelsColor}>Hotels</li>
        <li>Leads</li>
        <li
          style={CustomColor}
          onClick={() => navigate("/customer/?page=customer")}
        >
          Customer
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
