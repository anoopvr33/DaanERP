import React, { useState } from "react";
import AccountsVendorAdd from "../../accountAddComponents/vendor";
// import AccountsTable from "../../accoutsTable";
import AccountsVendor from "../../accoutsTable/vendor";
import FormItems from "../../Elements/formItems";
import Button from "../../Elements/button";

const AccVendor = ({ yesterdate, trigger }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="flex-1">
        {/* <FormItems type="date"></FormItems>{" "} */}
        <Button onClick={() => setOpen(!open)} child={"create +"}></Button>
      </div>
      {open && <AccountsVendorAdd></AccountsVendorAdd>}
      <p>
        <br />
        <b>Date : </b> {yesterdate}
      </p>
      <AccountsVendor
        yesterdate={yesterdate}
        trigger={trigger}
      ></AccountsVendor>
    </div>
  );
};

export default AccVendor;
