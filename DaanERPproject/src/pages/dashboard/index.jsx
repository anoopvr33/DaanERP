import Chart from "../../components/dashboardGraph";
import MyBarChart from "../../components/dashboardGraph";
// import BasicLineChart from "../../components/DashboardGraph";
import DashResult from "../../components/dashboardResult";
import Navbar from "../../components/navbar";
import SideBar from "../../components/sidebar";
import SidebarTwo from "../../components/sidebartwo";

import "./style.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="flex">
        <SidebarTwo></SidebarTwo>
        <div className="elements">
          <Navbar></Navbar>
          <DashResult></DashResult>
          <Chart></Chart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
