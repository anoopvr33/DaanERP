import React, { useState } from "react";
import AccountsVendorAdd from "../../accountAddComponents/vendor";
// import AccountsTable from "../../accoutsTable";
import AccountsVendor from "../../accoutsTable/vendor";
import FormItems from "../../Elements/formItems";
import Button from "../../Elements/button";

const AccVendor = ({ yesterdate }) => {
  const [open, setOpen] = useState(false);

  const head1 = ["Id", "purchase date", "Amount", "Payment Status"];
  const data1 = [{ id: "2", details: "rent", amount: "2900", remark: "true" }];

  return (
    <div>
      <div className="flex-1">
        {/* <FormItems type="date"></FormItems>{" "} */}
        <Button onClick={() => setOpen(!open)} child={"create +"}></Button>
      </div>
      {open && <AccountsVendorAdd></AccountsVendorAdd>}
      <p>
        {" "}
        <br />
        <b>Date : </b> {yesterdate}{" "}
      </p>
      <AccountsVendor
        yesterdate={yesterdate}
        head={head1}
        data={data1}
      ></AccountsVendor>
    </div>
  );
};

export default AccVendor;
