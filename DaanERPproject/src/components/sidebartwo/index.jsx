import { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

const menuItems = [
  "",
  "dashboard",
  "customer",
  "Hotels",
  "Accounts",
  "Leads",
  "booking",
  "Сообщения",
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

  return (
    <aside className="sidebar-3">
      <h3 className="logo">SUCCESS</h3>

      <ul className="menu">
        {menuItems.map((item, index) => (
          <p
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
              key={item}
              className={`menu-item ${ind == index ? "active" : ""}`}
            >
              {item}
            </li>
          </p>
        ))}
      </ul>
      <div className="bottom"></div>
    </aside>
  );
}
