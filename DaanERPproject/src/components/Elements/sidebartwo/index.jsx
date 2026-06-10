import { useEffect, useMemo, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { Hotels, IsStaff, IsSuper } from "../../../utils";

export default function SidebarTwo() {
  const [side, setOpen] = useState(false);

  const open = useMemo(() => {
    return localStorage.getItem("sidebar") === "true" ? true : false;
  }, [side]);

  const menuItems = [
    "",
    IsStaff() ? "" : "Dashboard",
    "Booking",
    "Customer",
    "Accounts",
    IsStaff() ? "" : "Reports",
    IsStaff() ? "" : "Payment",

    IsSuper() ? "Employees" : "",
    "",
  ];

  const Icons = [
    "",
    IsStaff() ? "" : <i class="fa-solid fa-chart-simple"></i>,
    <i class="fa-solid fa-suitcase-rolling"></i>,
    <i class="fa-solid fa-users"></i>,
    <i class="fa-solid fa-hotel"></i>,
    IsStaff() ? null : <i class="fa-solid fa-money-bill"></i>,
    IsStaff() ? null : <i class="fa-solid fa-file-invoice-dollar"></i>,

    IsSuper() ? <i class="fa-solid fa-user-tie"></i> : "",
  ];

  const page = new URLSearchParams(location.search);
  const ind = Number(page.get("index"));
  const navigate = useNavigate();

  // useEffect(() => {}, [IsSuper()]);

  useEffect(() => {}, [side]);

  useEffect(() => {
    console.log("open", open);
  }, [open]);

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
            key={index}
            style={{
              borderBottomRightRadius: `${ind - 1 == index ? "20px" : ""}`,
              borderTopRightRadius: `${ind + 1 == index ? "20px" : ""}`,
            }}
          >
            <li
              key={index}
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
            <i class="fa-solid fa-right-from-bracket"></i> <span> </span>
            {!open && "Logout"}
          </p>
        )}
      </div>
      {/* <p>Login</p> */}
    </aside>
  );
}
