import { useEffect, useState } from "react";

import AccountsHotelAdd from "../../accountAddComponents/hotel";
import { API } from "../../../utils/axios";
import TotalReciept from "../../reportTable/total";
import TotalRecieptSub from "../../reportTable/totalsub";
import ReportCheckout from "../../reportTable/checkout";
import Button from "../../Elements/button";

const ReportCheckoutTab = ({ checkout }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="flex-1"></div>
      {open && <AccountsHotelAdd></AccountsHotelAdd>}
      <h3></h3>
      <div style={{ marginBottom: "10px" }}>
        <Button
          onClick={() =>
            (window.location.href =
              "https://admin.daanregency.com/reports/export_checkout_excel/")
          }
          child={"Export Excel"}
        ></Button>{" "}
      </div>
      {/* <TotalReciept data={data1} /> */}
    </div>
  );
};

export default ReportCheckoutTab;
