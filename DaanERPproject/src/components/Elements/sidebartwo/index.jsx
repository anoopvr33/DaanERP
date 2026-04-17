import { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { Hotels, IsSuper } from "../../../utils";

const menuItems = [
  "",
  "Dashboard",
  "Customer",
  // "Hotels",
  "Accounts",
  "Reports",
  "Payment",
  "Booking",
  IsSuper === false && "Employees",
  "",
];

export default function SidebarTwo() {
  const [active, setActive] = useState(0);

  const page = new URLSearchParams(location.search);
  const ind = Number(page.get("index"));
  const navigate = useNavigate();
  //   const isTop={border}

  console.log("indexx", ind - 1);

  useEffect(() => {}, [ind]);

  console.log("is super", IsSuper);

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
