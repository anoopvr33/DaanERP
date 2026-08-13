import "./style.css";
import ReportRevenue from "../../reportTable/revenue";
import AccountsPosAdd from "../../accountAddComponents/pos";
import { API } from "../../../utils/axios";

const ReportRevenueTab = ({ revenue }) => {
  return (
    <div className="acc-pos">
      <div>
        <ReportRevenue data={revenue} />
      </div>
    </div>
  );
};

export default ReportRevenueTab;
