import "./style.css";
import ReportRevenue from "../../reportTable/revenue";
import AccountsPosAdd from "../../accountAddComponents/pos";
import { API } from "../../../utils/axios";
import Button from "../../Elements/button";
import ErrorPage from "../../Elements/Error";

const ReportRevenueTab = ({ revenue, prevmonth, yesterday,error }) => {

  if(error){
    return <ErrorPage></ErrorPage>
  }

  return (
    <div className="acc-pos">
      <div>
        <div style={{ marginBottom: "10px" }}>
          <Button
            onClick={() =>
              (window.location.href = `https://admin.daanregency.com/reports/export_revenue_excel/?from_date=${prevmonth}&to_date=${yesterday}`)
            }
            child={"Export Excel"}
          ></Button>{" "}
        </div>
        <ReportRevenue data={revenue} />
      </div>
    </div>
  );
};

export default ReportRevenueTab;
