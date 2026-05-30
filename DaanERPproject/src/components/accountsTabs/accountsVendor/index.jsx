import React, { useState } from "react";
import AccountsVendorAdd from "../../accountAddComponents/vendor";
// import AccountsTable from "../../accoutsTable";
import AccountsVendor from "../../accoutsTable/vendor";
import FormItems from "../../Elements/formItems";
import Button from "../../Elements/button";

const AccVendor = ({ dateset, trigger, prevMonth, hotels }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="flex-1">
        {/* <FormItems type="date"></FormItems>{" "} */}
        <p>
          <b>Date : </b> {dateset}
        </p>
        <Button
          onClick={() => setOpen(!open)}
          className={"add-vendor"}
          child={"New Vendor +"}
        ></Button>
      </div>
      {open && <AccountsVendorAdd></AccountsVendorAdd>}
      <br />

      <AccountsVendor
        yesterdate={dateset}
        trigger={trigger}
        prevMonth={prevMonth}
        hotels={hotels}
      ></AccountsVendor>
    </div>
  );
};

export default AccVendor;
