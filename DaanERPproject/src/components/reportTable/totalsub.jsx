import "./style.css";

const TotalRecieptSub = ({ data }) => {
  // const head = data.length > 0 ? Object.keys(data[0]) : [];

  if (data.length === 0) {
    return <p>Loading....</p>;
  }

  return (
    <table style={{ width: "350px" }} className="report-table">
      <tr>
        <th>Payment Type</th>
        <th>Value(INR)</th>
      </tr>

      <tbody>
        {data.length > 0 &&
          data.map((item) => (
            <tr className="report-row">
              <td>{item.payment}</td>
              <td>{item.value}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default TotalRecieptSub;
