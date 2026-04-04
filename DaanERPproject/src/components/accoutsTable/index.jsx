import "./style.css";

const AccountsTable = ({ data }) => {
  // const head = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <table className="accounts-table">
      <tr>
        <th>Date</th>
        <th>Category</th>
        <th>Subcategory</th>
        <th>Bank</th>
        <th>Description</th>
        <th>Reciepts</th>
        <th>Payments</th>
        <th>Balance</th>
        {/* {head.map((i) => (
          <th key={i}>{i}</th>
        ))} */}
      </tr>

      <tbody>
        {/* <td>1</td>
        <td>rent</td>
        <td>344</td>
        <td>Expense</td>
        <td>null</td> */}
        {data.length > 0 ? (
          data.map((item) => (
            <tr className="accounts-row">
              <td>{item.date}</td>
              <td>{item.category}</td>
              <td>{item.sub_category}</td>
              <td>{item.bank}</td>
              <td>{item.description}</td>
              <td>{item.receipts}</td>
              <td>{item.payments}</td>
              <td>{item.balance}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={8}>Empty Data</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default AccountsTable;
