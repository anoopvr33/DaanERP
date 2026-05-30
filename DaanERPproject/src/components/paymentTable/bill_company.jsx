import "./style.css";

const BillCompany = ({ result }) => {
  // const head = data.length > 0 ? Object.keys(data[0]) : [];

  console.log("rsssult", result);

  return (
    <table className="daan-table">
      <tr className="accounts-row">
        <th>bookingId</th>
        <th>bookedOn</th>
        <th> paymentMode</th>
        <th>debit/credit</th>
        <th>amount</th>
        <th> source</th>
        <th>guest_name</th>
        <th> checkin</th>
        <th>checkout</th>
        <th>room category</th>
        {/* <th>payment_link</th> */}
      </tr>

      <tbody>
        {Array.isArray(result) && result.length > 0 ? (
          result
            .map((row) => (
              <tr key={row.id} className="accounts-row">
                <td>{row.bookingId}</td>
                <td>{new Date(row.bookedOn).toLocaleString()}</td>
                <td>{row.paymentMode}</td>

                <td>{row.debit_credit ? row.debit_credit : "Null"}</td>
                <td>{row.amount.toFixed(2)}</td>
                <td>{row.source}</td>
                <td>{row.guest_name}</td>
                <td>{row.checkin}</td>
                <td>{row.checkout}</td>
                <td>{row.room_code}</td>
                {/* <td>{row.payment_link ? row.payment_link : "Null"}</td> */}
              </tr>
            ))
            .reverse()
        ) : (
          <tr>
            <td colSpan={9}>Empty Data</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default BillCompany;
