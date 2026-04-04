import React, { useState } from "react";
import AccountsVendorAdd from "../../accountAddComponents/vendor";
// import AccountsTable from "../../accoutsTable";
import AccountsVendor from "../../accoutsTable/vendor";
import ReportTax from "../../reportTable/tax";

const ReportTaxTab = () => {
  const [open, setOpen] = useState(false);

  const head1 = ["Id", "purchase date", "Amount", "Payment Status"];
  const data1 = [
    { name: "asdas", description: "aaaaa", preTax: "100", amount: "2321" },
  ];

  return (
    <div>
      {/* <div className="flex-1">
        <FormItems type="date"></FormItems>{" "}
        
        <Button onClick={() => setOpen(!open)} child={"create +"}></Button>
      </div> */}
      {open && <AccountsVendorAdd></AccountsVendorAdd>}
      <ReportTax data={data1}></ReportTax>
    </div>
  );
};

export default ReportTaxTab;
