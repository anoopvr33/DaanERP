import "./style.css";

const ReportTax = ({ data }) => {
  // const head = data.length > 0 ? Object.keys(data[0]) : [];
  return (
    <table style={{ width: "700px" }} className="report-table">
      <tr>
        <th>Name</th>
        <th>Hotel</th>
        <th>GST Number</th>
        <th>Total Amount</th>
      </tr>

      <tbody>
        {data.length > 0 ? (
          data.map((item) => (
            <tr className="report-row">
              <td>{item.name}</td>
              <td>{item.hotel_code}</td>
              <td>{item.gst_number}</td>
              <td>{item.total_amount}</td>
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

export default ReportTax;
