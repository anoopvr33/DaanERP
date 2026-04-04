import Button from "../../components/Elements/button";
import FormItems from "../../components/Elements/formItems";
// import MyBarChart from "../../components/dashboardGraph";
// import BasicLineChart from "../../components/DashboardGraph";
// import DashResult from "../../components/dashboardResult";
import Navbar from "../../components/Elements/navbar";
import "./style.css";
import SidebarTwo from "../../components/Elements/sidebartwo";
import CustomTabs from "../../components/CustomerTabs";
import { useEffect, useState } from "react";
import { Hotels } from "../../utils";
import CustomerTable from "../../components/CustomerTable";
import { useDispatch } from "react-redux";
import { getCustomerData } from "../../redux/customerSlice";

const Customer = () => {
  const [date, setDate] = useState(12);
  const [count, setCount] = useState("");
  const [year, setYear] = useState("");
  const [form, setForm] = useState({
    hotels: Hotels(),
    month: 12,
  });

  const dispatch = useDispatch();

  // const Select = ["select month", 3, 6, 12];
  const Select = [
    { name: "Last 12 Months", value: 12 },
    { name: "Last 6 Months", value: 6 },
    { name: "Last 3 Months", value: 3 },
  ];
  const Count = [
    { name: "Count vise", value: "" },
    { name: "More Count", value: "More Count" },
    { name: "Less Count", value: "Less Count" },
  ];
  // const Year = ["Select Year", "2026", "2025", "2024"];
  const Year = [
    { name: "Select Year", value: "" },
    { name: "2026", value: 2026 },
    { name: "2025", value: 2025 },
  ];

  useEffect(() => {
    dispatch(getCustomerData(form));
  }, []);

  return (
    <div className="customer">
      <div className="flex common-flex">
        <SidebarTwo></SidebarTwo>
        <div className="elements common-element">
          <Navbar></Navbar>
          <h2>
            Customer Management
            <div className="flex-1">
              <FormItems
                element={"select"}
                option={[
                  "All Hotels",
                  ...(Hotels() ? Hotels() : ["no data found"]),
                ]}
                // multiple
                onChange={(e) => {
                  // const selected = Array.from(
                  //   e.target.selectedOptions,
                  //   (opt) => opt.value,
                  // );
                  // setForm((prev) => ({ ...prev, hotels: selected }));
                  setForm((prev) => ({
                    ...prev,
                    hotels:
                      e.target.value === "All Hotels"
                        ? Hotels()
                        : [e.target.value],
                  }));
                }}
                type="date"
              />
              <FormItems
                onChange={(e) =>
                  setForm({ ...form, month: Number(e.target.value) })
                }
                option={Select}
                element="select"
              ></FormItems>
              <FormItems
                onChange={(e) => setCount(e.target.value)}
                option={Count}
                element="select"
              ></FormItems>{" "}
              <Button
                onClick={() => dispatch(getCustomerData(form))}
                child={"Filter"}
              ></Button>
            </div>
          </h2>

          <CustomerTable date={date} count={count}></CustomerTable>

          {/* <CustomTabs date={date} count={count}></CustomTabs> */}
        </div>
      </div>
    </div>
  );
};

export default Customer;
