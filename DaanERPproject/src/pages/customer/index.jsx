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
import Select from "react-select";

const option2 = Hotels()
  ? Hotels().map((i) => ({
      value: i,
      label: i.charAt(0).toUpperCase() + i.slice(1),
    }))
  : [];

const Customer = () => {
  const [date, setDate] = useState(12);
  const [count, setCount] = useState("");
  const [year, setYear] = useState("");
  const [form, setForm] = useState({
    hotels: Hotels() ? Hotels() : [],
    month: 12,
  });

  const dispatch = useDispatch();

  const elect = [
    { name: "Last 12 Months", value: 12 },
    { name: "Last 6 Months", value: 6 },
    { name: "Last 3 Months", value: 3 },
  ];
  const Count = [
    { name: "Count vise", value: "" },
    { name: "More Count", value: "More Count" },
    { name: "Less Count", value: "Less Count" },
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
          <div className="h2-sub">
            <h2>Customer Management</h2>
            <div className="flex-1">
              <Select
                // styles={{ width: "500px" }}
                onChange={(selected) => {
                  // if (!selected) return setForm({ ...form, hotels: [] });
                  if (!selected || selected.length === 0) {
                    setForm({ ...form, hotels: Hotels() ? Hotels() : [] });
                    return;
                  }
                  setForm({ ...form, hotels: selected });
                }}
                isMulti
                className="custom-multi-select"
                placeholder={"All Hotels"}
                options={option2}
              ></Select>
              {/* <FormItems
                element={"select"}
                option={[
                  "All Hotels",
                  ...(Hotels() ? Hotels() : ["no data found"]),
                ]}
                onChange={(e) => {
                  setForm((prev) => ({
                    ...prev,
                    hotels:
                      e.target.value === "All Hotels"
                        ? Hotels()
                        : [e.target.value],
                  }));
                }}
                type="date"
              /> */}
              <FormItems
                onChange={(e) =>
                  setForm({ ...form, month: Number(e.target.value) })
                }
                option={elect}
                element="select"
              ></FormItems>
              <FormItems
                onChange={(e) => setCount(e.target.value)}
                option={Count}
                element="select"
              ></FormItems>
              <Button
                onClick={() => dispatch(getCustomerData(form))}
                child={"Filter"}
              ></Button>
            </div>
          </div>

          <CustomerTable date={date} count={count}></CustomerTable>

          {/* <CustomTabs date={date} count={count}></CustomTabs> */}
        </div>
      </div>
    </div>
  );
};

export default Customer;
