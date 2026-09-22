import BillCompany from "../../paymentTable/bill_company";

const UpiCurrentTab = ({ date, result }) => {
  return (
    <div>
      <div className="flex-1"></div>
      <BillCompany result={result} date={date}></BillCompany>
    </div>
  );
};

export default UpiCurrentTab;
