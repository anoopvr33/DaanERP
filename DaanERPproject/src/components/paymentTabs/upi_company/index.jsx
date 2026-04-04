import { useEffect, useState } from "react";
import CustomerTable from "../../CustomerTable";
import BillCompany from "../../paymentTable/bill_company";
import CashPay from "../../paymentTable/cash";
import UpiCompany from "../../paymentTable/upi_company";
import UpiCurrent from "../../paymentTable/upi_current";
import { API } from "../../../utils/axios";

const UpiCompanyTab = ({ date, result }) => {
  const [data, setData] = useState([]);

  return (
    <div>
      <div className="flex-1"></div>
      {/* <ReportAudit></ReportAudit> */}

      <UpiCompany result={result} date={date}></UpiCompany>
    </div>
  );
};

export default UpiCompanyTab;
