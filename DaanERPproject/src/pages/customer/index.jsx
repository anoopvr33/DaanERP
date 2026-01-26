import React from "react";
import Button from "../../components/button";
import CustomerTable from "../../components/CustomerTable";
import Chart from "../../components/dashboardGraph";
import FormItems from "../../components/formItems";
// import MyBarChart from "../../components/dashboardGraph";
// import BasicLineChart from "../../components/DashboardGraph";
// import DashResult from "../../components/dashboardResult";
import Navbar from "../../components/navbar";
import SideBar from "../../components/sidebar";

import "./style.css";
import SidebarTwo from "../../components/sidebartwo";

const Customer = () => {
  const Select = ["Hotel", "Daan Lux", "Daan Ambalath", "Regency"];
  const Count = ["Sort", "By Date", "More Count", "Less Count", ""];

  return (
    <div className="customer">
      <div className="flex">
        <SidebarTwo></SidebarTwo>
        <div className="elements">
          <Navbar></Navbar>
          <h2>Customer Management</h2>
          <div className="flex-1">
            <FormItems option={Select} element="select"></FormItems>{" "}
            <FormItems option={Count} element="select"></FormItems>{" "}
            <Button child={"Filter"}></Button>
          </div>

          <CustomerTable></CustomerTable>
        </div>
      </div>
    </div>
  );
};

export default Customer;
