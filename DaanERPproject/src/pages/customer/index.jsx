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
import { useDispatch, useSelector } from "react-redux";
import { getCustomerData } from "../../redux/customerSlice";
import Select from "react-select";
import LoadingItem from "../../components/Elements/Loading";
import ErrorPage from "../../components/Elements/Error";
import { useNavigate } from "react-router-dom";

// const option2 = Hotels()
//   ? Hotels().map((i) => ({
//       value: i,
//       label: i.charAt(0).toUpperCase() + i.slice(1),
//     }))
//   : [];

const Customer = () => {
  const [count, setCount] = useState("");
  const [hotelOptions, setHotelOptions] = useState([]);
  const [form, setForm] = useState({
    hotels: Hotels() ? Hotels() : [],
    month: 12,
    value: null,
    operator: "Equal",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items, error, loading } = useSelector((state) => state.customer);

  const elect = [
    { name: "Last 12 Months", value: 12 },
    { name: "Last 6 Months", value: 6 },
    { name: "Last 3 Months", value: 3 },
  ];
  const Count = [
    { name: "Default", value: "" },
    { name: "More Count", value: "More Count" },
    { name: "Less Count", value: "Less Count" },
  ];
  const Operator = [
    { name: "Equal", value: "Equal" },
    { name: "Contain", value: "Contain" },
    { name: "Not Contain", value: "Not Contain" },
  ];

  useEffect(() => {
    dispatch(getCustomerData(form));
  }, [hotelOptions]);

  useEffect(() => {
    const hotels = Hotels();
    if (hotels.length === 0) {
      navigate("/login");
    }
    console.log("hotelsss", hotels);

    if (hotels && hotels.length > 0) {
      const formatted = hotels.map((i) => ({
        value: i,
        label: i.charAt(0).toUpperCase() + i.slice(1),
      }));

      setHotelOptions(formatted); // initialize selection
      setForm({ ...form, hotels: formatted.map((i) => i.value) });
    }
  }, []);

  console.log("customer error", error);

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
                onChange={(selected) => {
                  if (!selected || selected.length === 0) {
                    setForm({ ...form, hotels: Hotels() ? Hotels() : [] });
                    return;
                  }
                  setForm({ ...form, hotels: selected.map((i) => i.value) });
                }}
                isMulti
                className="custom-multi-select"
                placeholder={"All Hotels"}
                options={hotelOptions}
              ></Select>

              <label htmlFor="">
                <p className="placeholder">Select Months</p>
                <FormItems
                  onChange={(e) =>
                    setForm({ ...form, month: Number(e.target.value) })
                  }
                  option={elect}
                  element="select"
                ></FormItems>
              </label>
              <label htmlFor="">
                <p className="placeholder">Select Operator</p>
                <FormItems
                  onChange={(e) =>
                    setForm({ ...form, operator: e.target.value })
                  }
                  option={Operator}
                  element="select"
                ></FormItems>
              </label>

              <label htmlFor="">
                <p className="placeholder">No. of Bookings</p>
                <FormItems
                  onChange={(e) =>
                    e.target.value === "0"
                      ? setForm({ ...form, value: null })
                      : setForm({ ...form, value: Number(e.target.value) })
                  }
                  option={Count}
                  type="number"
                  defualt={0}
                  // element="select"
                ></FormItems>
              </label>
              <Button
                // onClick={() => console.log("my form", form)}
                onClick={() => dispatch(getCustomerData(form))}
                child={"Filter"}
              ></Button>

              <label style={{ margin: "auto", marginRight: "0px" }} htmlFor="">
                <p className="placeholder">Count Vise</p>
                <FormItems
                  onChange={(e) => setCount(e.target.value)}
                  option={Count}
                  element="select"
                ></FormItems>
              </label>
            </div>
          </div>
          {loading ? (
            <LoadingItem />
          ) : error ? (
            <ErrorPage />
          ) : (
            <CustomerTable items={items} count={count}></CustomerTable>
          )}

          {/* <CustomTabs date={date} count={count}></CustomTabs> */}
        </div>
      </div>
    </div>
  );
};

export default Customer;
