import "./style.css";

const ReportRevenue = ({ data }) => {
  const head = data?.length > 0 ? Object.keys(data[0]) : [];

  console.log("my daaaaa", data);

  return (
    <table className="report-table">
      <tr>
        {data?.length != 0 ? (
          Object.keys(data[0]).map((key) => <th>{key}</th>)
        ) : (
          <th>Empty Data</th>
        )}
      </tr>
      <tbody>
        {data?.length > 0 &&
          data.map((item, index) => (
            <tr>
              {data?.length > 0 ? (
                Object.values(data[index]).map((i) => <td>{i}</td>)
              ) : (
                <td>Empty data</td>
              )}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default ReportRevenue;
