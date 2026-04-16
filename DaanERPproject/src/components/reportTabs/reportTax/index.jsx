import React, { useEffect, useState } from "react";
import AccountsVendorAdd from "../../accountAddComponents/vendor";
// import AccountsTable from "../../accoutsTable";
import AccountsVendor from "../../accoutsTable/vendor";
import ReportTax from "../../reportTable/tax";
import { API, getCookie } from "../../../utils/axios";
import { Hotels } from "../../../utils";

const ReportTaxTab = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

  const GetGst = async () => {
    const response = await API.post(
      "/bookings/gst_bookings_by_date/",
      {
        hotels: Hotels(),
        from_date: "2026-03-16",
        to_date: "2026-04-15",
        filter_method: "booking",
      },
      {
        withCredentials: true,
        headers: {
          "X-CSRFToken": getCookie("csrftoken"),
        },
      },
    );
    console.log("gst res", response);
    setData(response.data.data);
  };

  useEffect(() => {
    GetGst();
  }, []);

  return (
    <div>
      

      {/* <div className="flex-1">
        <FormItems type="date"></FormItems>{" "}
        
        <Button onClick={() => setOpen(!open)} child={"create +"}></Button>
      </div> */}
      
      {open && <AccountsVendorAdd></AccountsVendorAdd>}
      <ReportTax data={data}></ReportTax>
    </div>
  );
};

export default ReportTaxTab;
