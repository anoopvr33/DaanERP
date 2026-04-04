import { useEffect, useState } from "react";
import AccountsDailyAdd from "../../accountAddComponents";
import { API } from "../../../utils/axios";
import ReportAudit from "../../reportTable/audit";

const ReportAuditTab = ({ audit }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log("maiaajisjdd", audit);
  }, [audit]);

  console.log("maiamimd", audit);

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
      <ReportAudit data={audit}></ReportAudit>
    </div>
  );
};

export default ReportAuditTab;
