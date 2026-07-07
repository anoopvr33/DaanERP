import { useEffect, useState } from "react";

import AccountsHotelAdd from "../../accountAddComponents/hotel";
import { API } from "../../../utils/axios";
import TotalReciept from "../../reportTable/total";
import TotalRecieptSub from "../../reportTable/totalsub";
import ReportCheckout from "../../reportTable/checkout";

const ReportCheckoutTab = ({ checkout }) => {
  const [open, setOpen] = useState(false);


  return (
    <div>
      <div className="flex-1"></div>
      {open && <AccountsHotelAdd></AccountsHotelAdd>}
      <h3></h3>
      <ReportCheckout data={checkout}></ReportCheckout>
      {/* <TotalReciept data={data1} /> */}
    </div>
  );
};

export default ReportCheckoutTab;
