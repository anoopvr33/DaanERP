import LoadingItem from "../../Elements/Loading";
import BillCompany from "../../paymentTable/bill_company";

const BillCompanyTab = ({ date, result, loading }) => {
  return (
    <div>
      <div className="flex-1"></div>
      {/* <ReportAudit></ReportAudit> */}
      {loading ? (
        <LoadingItem></LoadingItem>
      ) : (
        <BillCompany result={result} date={date}></BillCompany>
      )}
    </div>
  );
};

export default BillCompanyTab;
