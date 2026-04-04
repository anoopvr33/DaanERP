import "./style.css";
import { useState } from "react";
import CustomerDetails from "./customerDetails";

const CustomTabs = ({ date, count }) => {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(false);

  const POS = {
    borderRadius: "20px 20px 0px 0px",
    background: tab == 0 && "    hsl(0, 0%, 100%)",
    color: tab == 0 && "#386f74",
    borderBottomRightRadius: tab - 1 == 0 && "20px",
    borderBottomLeftRadius: tab + 1 == 0 && "20px",
  };
  const None = {
    borderRadius: "20px 20px 0px 0px",
    // background: tab == 0 && "    hsl(0, 0%, 100%)",
    color: tab == 0 && "#386f74",
    borderBottomRightRadius: tab - 1 == 1 && "20px",
    borderBottomLeftRadius: tab + 1 == 1 && "20px",
  };

  const TabArray = [
    {
      id: 0,
      name: "Three Month",
      link: "pos",
      style: POS,
    },
    {
      id: 1,
      name: "",
      link: "",
      style: None,
    },
  ];

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
        {tab === 0 && (
          <CustomerDetails date={date} count={count}></CustomerDetails>
        )}
      </div>
    </div>
  );
};

export default CustomTabs;
