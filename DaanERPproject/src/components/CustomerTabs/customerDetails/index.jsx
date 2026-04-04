import CustomerTable from "../../CustomerTable";

const CustomerDetails = ({ date, count }) => {
  return (
    <div>
      <div className="flex-1"></div>
      {/* <ReportAudit></ReportAudit> */}
      <CustomerTable date={date} count={count}></CustomerTable>
    </div>
  );
};

export default CustomerDetails;
