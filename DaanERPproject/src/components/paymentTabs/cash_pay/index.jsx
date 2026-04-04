import { useEffect, useState } from "react";
import CustomerTable from "../../CustomerTable";
import BillCompany from "../../paymentTable/bill_company";
import CashPay from "../../paymentTable/cash";
import UpiCompany from "../../paymentTable/upi_company";
import UpiCurrent from "../../paymentTable/upi_current";
import { API } from "../../../utils/axios";

const CashPayTab = ({ date, result }) => {
  const [data, setData] = useState([]);

  return (
    <div>
      <div className="flex-1"></div>
      {/* <ReportAudit></ReportAudit> */}
      <CashPay result={result} date={date}></CashPay>
    </div>
  );
};

export default CashPayTab;
