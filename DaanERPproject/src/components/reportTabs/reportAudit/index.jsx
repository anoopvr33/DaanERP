import { useEffect, useState } from "react";
import AccountsDailyAdd from "../../accountAddComponents";
import { API } from "../../../utils/axios";
import ReportAudit from "../../reportTable/audit";
import LoadingItem from "../../Elements/Loading";

const ReportAuditTab = ({ audit, yesterday, prevmonth, loading }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="flex-1">
        {/* <FormItems
          value={formattedDate}
          onChange={(e) => setDate(e.target.value)}
          type="date"
        ></FormItems>
        <Button onClick={() => setOpen(!open)} child={"create +"}></Button> */}
      </div>
      {open && <AccountsDailyAdd></AccountsDailyAdd>}
      {loading ? (
        <LoadingItem></LoadingItem>
      ) : (
        <ReportAudit
          yesterday={yesterday}
          prevmonth={prevmonth}
          data={audit}
        ></ReportAudit>
      )}
    </div>
  );
};

export default ReportAuditTab;
