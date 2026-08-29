import AccountsDailyAdd from "../../accountAddComponents";
import { API } from "../../../utils/axios";
import ReportAudit from "../../reportTable/audit";
import LoadingItem from "../../Elements/Loading";
import ErrorPage from "../../Elements/Error";

const ReportAuditTab = ({ audit, yesterday, prevmonth, loading, error }) => {
  if (error) {
    return <ErrorPage></ErrorPage>;
  }

  return (
    <div>
      <div className="flex-1"></div>

      {loading ? (
        <LoadingItem></LoadingItem>
      ) : (
        <ReportAudit
          error={error}
          yesterday={yesterday}
          prevmonth={prevmonth}
          data={audit}
        ></ReportAudit>
      )}
    </div>
  );
};

export default ReportAuditTab;
