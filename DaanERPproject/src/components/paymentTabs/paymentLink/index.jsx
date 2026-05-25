import React from "react";
import BillCompany from "../../paymentTable/bill_company";

const PaymentLink = ({ date, result }) => {
  return (
    <div>
      <div className="flex-1"></div>
      {/* <ReportAudit></ReportAudit> */}
      <BillCompany result={result} date={date}></BillCompany>
    </div>
  );
};

export default PaymentLink;
