import { useEffect, useMemo, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { Hotels, IsSuper } from "../../../utils";

export default function SidebarTwo() {
  const [side, setOpen] = useState(false);

  const open = useMemo(() => {
    return localStorage.getItem("sidebar") === "true" ? true : false;
  }, [side]);

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

  useEffect(() => {}, [side]);

  // useEffect(() => {}, [open]);

  return (
    <aside className={`sidebar-3 ${open && "active"}`}>
      <h1 className="logo">
        <i
          onClick={() => (
            setOpen(!side),
            localStorage.setItem("sidebar", !side)
          )}
          class={`fa  ${open ? "fa-angle-right" : "fa-angle-left"}`}
          aria-hidden="true"
        ></i>
        {/* <span>DaanERP</span> */}
      </h1>

      <ul className={`menu ${open && "menu-active"}`}>
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
              className={`menu-item ${ind == index ? "active" : ""} ${open && "menu-item-active"}`}
            >
              {Icons[index]} <span> </span>
              {!open && item}
            </li>
          </p>
        ))}
      </ul>
      <div className={`bottom ${open && "bot-active"}`}>
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
            {!open && "Logout"} <i class="fa-solid fa-right-from-bracket"></i>
          </p>
        )}
      </div>
      {/* <p>Login</p> */}
    </aside>
  );
}
