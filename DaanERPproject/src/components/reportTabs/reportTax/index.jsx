import React, { useState } from "react";
import AccountsVendorAdd from "../../accountAddComponents/vendor";
// import AccountsTable from "../../accoutsTable";
import AccountsVendor from "../../accoutsTable/vendor";
import ReportTax from "../../reportTable/tax";

const ReportTaxTab = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* <div className="flex-1">
        <FormItems type="date"></FormItems>{" "}
        
        <Button onClick={() => setOpen(!open)} child={"create +"}></Button>
      </div> */}
      {open && <AccountsVendorAdd></AccountsVendorAdd>}
      <ReportTax data={[]}></ReportTax>
    </div>
  );
};

export default ReportTaxTab;
