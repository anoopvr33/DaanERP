import "./style.css";

const ReportTax = ({ data }) => {
  // const head = data.length > 0 ? Object.keys(data[0]) : [];
  return (
    <table className="report-table">
      <tr>
        <th>name</th>
        <th>description</th>
        <th>preTax</th>
        <th>amount</th>
      </tr>

      <tbody>
        {data.length > 0 &&
          data.map((item) => (
            <tr className="report-row">
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.preTax}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default ReportTax;
