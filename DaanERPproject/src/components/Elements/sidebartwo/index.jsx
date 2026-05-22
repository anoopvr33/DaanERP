import { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { Hotels, IsSuper } from "../../../utils";

export default function SidebarTwo() {
  const menuItems = [
    "",
    "Dashboard",
    "Customer",
    // "Hotels",
    "Accounts",
    "Reports",
    "Payment",
    "Booking",
    // "Employees",
    IsSuper() ? "Employees" : "",
    "",
  ];

  const Icons = [
    "",
    <i class="fa-solid fa-chart-simple"></i>,
    <i class="fa-solid fa-users"></i>,
    <i class="fa-solid fa-hotel"></i>,
    <i class="fa-solid fa-money-bill"></i>,
    <i class="fa-solid fa-file-invoice-dollar"></i>,
    <i class="fa-solid fa-suitcase-rolling"></i>,
    <i class="fa-solid fa-user-tie"></i>,
  ];

  const page = new URLSearchParams(location.search);
  const ind = Number(page.get("index"));
  const navigate = useNavigate();

  useEffect(() => {}, [IsSuper()]);

  return (
    <aside className="sidebar-3">
      <h1 className="logo">
        Daan<span style={{ color: "rgb(190, 133, 255)" }}>ERP</span>
      </h1>

      <ul className="menu">
        {menuItems.map((item, index) => (
          <p
            key={item}
            style={{
              borderBottomRightRadius: `${ind - 1 == index ? "20px" : ""}`,
              borderTopRightRadius: `${ind + 1 == index ? "20px" : ""}`,
            }}
          >
            <li
              onClick={() => navigate(`/${item}/?index=${index}`)}
              style={{
                borderBottomRightRadius: `${ind - 1 == index ? "20px" : ""}`,
                borderTopRightRadius: `${ind + 1 == index ? "20px" : ""}`,
              }}
              className={`menu-item ${ind == index ? "active" : ""}`}
            >
              {Icons[index]} <span> </span>
              {item}
            </li>
          </p>
        ))}
      </ul>
      <div className="bottom">
        {!Hotels() ? (
          <p>Login</p>
        ) : (
          <p
            onClick={() => (
              localStorage.removeItem("hotel"),
              localStorage.removeItem("is_super"),
              (window.location.href = "/login")
            )}
          >
            Logout <i class="fa-solid fa-right-from-bracket"></i>
          </p>
        )}
      </div>
      {/* <p>Login</p> */}
    </aside>
  );
}
