import { useState } from "react";
import Navbar from "../../components/Elements/navbar";
import "./style.css";
import SidebarTwo from "../../components/Elements/sidebartwo";
// import AccountsTabs from "../../components/accountsTabs";
import PaymentTabs from "../../components/paymentTabs";
import FormItems from "../../components/Elements/formItems";
import Button from "../../components/Elements/button";
import { Hotels } from "../../utils";

const Payment = () => {
  // const [date, setDate] = useState("");
  const [hotels, setHotel] = useState(Hotels());
  const [trigger, setTrigger] = useState(false);

  const today = new Date();

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

  const Select = ["Hotel", "Daan Lux", "Daan Ambalath", "Regency"];
  const Count = ["Sort", "By Date", "More Count", "Less Count", ""];

  return (
    <div className="accounts">
      <div className="flex common-flex">
        <SidebarTwo></SidebarTwo>
        <div className="elements common-element">
          <Navbar></Navbar>
          <h2>
            Payment Management
            <div className="flex-1">
              <FormItems
                element={"select"}
                option={["All Hotels", ...(Hotels() ? Hotels() : "")]}
                // multiple
                onChange={(e) => {
                  // const selected = Array.from(
                  //   e.target.selectedOptions,
                  //   (opt) => opt.value,
                  // );
                  // setHotel(() => selected);
                  setHotel(
                    e.target.value === "All Hotels"
                      ? Hotels()
                      : [e.target.value],
                  );
                }}
                // setHotel(e.target.value)

                type="date"
              />
              <span> </span>
              <p>From</p>
              <FormItems
                value={prevMonthDate}
                onChange={(e) => setPrevMonthDate(e.target.value)}
                type="date"
              />
              <span> </span>
              <p>to</p>
              <FormItems
                value={yesterdayDate}
                onChange={(e) => setYesterdayDate(e.target.value)}
                type="date"
              />
              <Button
                onClick={() => setTrigger(!trigger)}
                child={"Submit"}
              ></Button>
            </div>
          </h2>
          <PaymentTabs
            prevmonth={prevMonthDate}
            yesterday={yesterdayDate}
            hotelsArray={hotels}
            trigger={trigger}
          ></PaymentTabs>

          {/* <CustomerTable></CustomerTable> */}
        </div>
      </div>
    </div>
  );
};

export default Payment;
