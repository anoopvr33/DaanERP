import "./style.css";

const TotalReciept = ({ data }) => {
  // const head = data.length > 0 ? Object.keys(data[0]) : [];

  if (data.length === 0) {
    return <p>Loading....</p>;
  }

  return (
    <table className="report-table">
      <tr>
        <th>room</th>
        <th>guest</th>
        <th>amount</th>
        <th>invoice</th>
        <th>folioNo</th>
        <th>payAmount</th>
        <th>mode</th>
        <th>time</th>
        <th>comments</th>
      </tr>

      <tbody>
        {/* <td>1</td>
        <td>rent</td>
        <td>344</td>
        <td>Expense</td>
        <td>null</td> */}
        {data.length > 0 &&
          data.map((item) => (
            <tr className="report-row">
              <td>{item.room}</td>
              <td>{item.guest}</td>
              <td>{item.amount}</td>
              <td>{item.invoice}</td>
              <td>{item.folioNo}</td>
              <td>{item.payAmount}</td>
              <td>{item.mode}</td>
              <td>{item.time}</td>
              <td>{item.comments}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default TotalReciept;
