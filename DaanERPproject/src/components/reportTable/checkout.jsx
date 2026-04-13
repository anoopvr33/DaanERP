import "./style.css";

const ReportCheckout = ({ data }) => {
  // const head = data.length > 0 ? Object.keys(data[0]) : [];
  return (
    <table className="report-table">
      <tr>
        <th>Guest Name</th>
        <th>Room No.</th>
        <th>Source</th>
        <th>CheckIn</th>
        <th>CheckOut</th>
        <th>No. of Guests</th>
        <th>Status</th>
        <th>Total(INR)</th>
        <th>Folio No.</th>
        <th>Invoice No.</th>
      </tr>

      <tbody>
        {data.length > 0 ? (
          data.map((item) => (
            <tr className="report-row">
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.preTax}</td>
              <td>{item.amount}</td>
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
