import "./style.css";

const ReportCheckout = ({ data }) => {
  // const head = data.length > 0 ? Object.keys(data[0]) : [];

  console.log("account checkout", data);

  return (
    <table className="daan-table">
      <tr>
        <th>Guest Name</th>
        <th>Room No.</th>
        <th>CheckIn</th>
        <th>CheckOut</th>
        <th>Total(INR)</th>
        <th>Tax</th>
        <th>Folio No.</th>
        <th>Source</th>
      </tr>

      <tbody>
        {data?.length > 0 ? (
          data?.map((item) => (
            <tr className="report-row">
              <td>{item.guest_name}</td>
              <td>{item.room_no}</td>
              <td>{item.checkin}</td>
              <td>{item.checkout}</td>
              <td>{item.amount}</td>
              <td>{item.tax}</td>
              <td>{item.folio_no}</td>
              <td>{item.source}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4}> empty data </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ReportCheckout;
