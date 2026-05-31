import { useEffect, useMemo, useState } from "react";
import Button from "../components/Elements/button";
import Navbar from "../components/Elements/navbar";
import SidebarTwo from "../components/Elements/sidebartwo";
import EmployeeAdd from "../components/EmployeAdd";
import EmployeeTable from "../components/EmployeTable";
import { formatHotel, Hotels } from "../utils";
import Select from "react-select";
import LoadingItem from "../components/Elements/Loading";
import ErrorPage from "../components/Elements/Error";

const Employee = () => {
  const formattedHotels = useMemo(() => formatHotel() || [], []);

  const [open, setOpen] = useState(false);
  const [data, setData] = useState(formattedHotels);
  const [loading] = useState(false);
  const [error] = useState(false);

  const onFilter = () => {
    console.log("jjkkkjk", data);

    // dispatch(getBookingData(data));
  };

  useEffect(() => {
    // dispatch(getBookingData(data));
  }, []);

  return (
    <div className="daan">
      <div className="flex common-flex">
        <SidebarTwo></SidebarTwo>
        <div className="elements common-element">
          <Navbar></Navbar>
          <div className="h2-sub">
            <h2>User Management</h2>
            <div className="flex-1">
              <Select
                onChange={(selected) => {
                  // if (!selected) return setHotel([]);
                  if (!selected || selected.length === 0) {
                    setData(data);
                    return;
                  }
                  setData(selected);
                }}
                placeholder={"All Hotels"}
                options={data}
                isMulti
                className="custom-multi-select"
              ></Select>

              <Button onClick={onFilter} child={"Filter"}></Button>
              <Button
                onClick={() => setOpen(!open)}
                className={"booking-add"}
                child={open ? "Close" : "Add"}
              ></Button>
            </div>
          </div>
          {/* <p className="line">.</p> */}

          {open && <EmployeeAdd></EmployeeAdd>}

          {loading ? (
            <LoadingItem />
          ) : error ? (
            <ErrorPage />
          ) : (
            <EmployeeTable></EmployeeTable>
          )}
        </div>
      </div>
    </div>
  );
};

export default Employee;
