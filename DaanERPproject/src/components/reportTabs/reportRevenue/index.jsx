import "./style.css";
import { useEffect, useState } from "react";
// import AccountsAdd from "../accountsAdd";
// import AccountsTable from "../../accoutsTable";

import axios from "axios";
import ReportRevenue from "../../reportTable/revenue";
import AccountsPosAdd from "../../accountAddComponents/pos";
import { API } from "../../../utils/axios";

const ReportRevenueTab = ({ revenue }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="acc-pos">
      <div>
        <div className="flex-1">
          {/* <FormItems
            value={formattedDate2}
            onChange={(e) => setDate2(e.target.value)}
            type="date"
          />
          <Button onClick={() => setOpen(!open)} child={"Create +"} /> */}
        </div>
        {open && <AccountsPosAdd type={"IN"} formdate={""} />}
        <ReportRevenue head={""} data={revenue} />
      </div>
    </div>
  );
};

export default ReportRevenueTab;
