import { useEffect, useState } from "react";

import AccountsHotelAdd from "../../accountAddComponents/hotel";
import { API } from "../../../utils/axios";
import TotalReciept from "../../reportTable/total";
import TotalRecieptSub from "../../reportTable/totalsub";
import ReportCheckout from "../../reportTable/checkout";
import Button from "../../Elements/button";

const ReportCheckoutTab = ({ checkout, prevmonth, yesterday }) => {
  // const [open, setOpen] = useState(false);

  console.log("my checkout", checkout);

  return (
    <div>
      <div className="flex-1"></div>
      {/* {open && <AccountsHotelAdd></AccountsHotelAdd>} */}
      <h3></h3>
      <div style={{ marginBottom: "10px" }}>
        <Button
          onClick={() =>
            (window.location.href = `https://admin.daanregency.com/reports/export_checkout_excel/?from_date=${prevmonth}&to_date=${yesterday}`)
          }
          child={"Export Excel"}
        ></Button>{" "}
      </div>
      <ReportCheckout data={checkout}></ReportCheckout>
      {/* <TotalReciept data={data1} /> */}
    </div>
  );
};

export default ReportCheckoutTab;
