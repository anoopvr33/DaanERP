import "./style.css";

const ReportAudit = ({ data, yesterday, prevmonth }) => {
  // const head = data.length > 0 ? Object.keys(data[0]) : [];

  console.log("audit data", data);

  return (
    <table style={{ width: "600px" }} className="report-table">
      <tr>
        <th>Name</th>
        <th>Current ({yesterday})</th>
        <th>
          Upto ({prevmonth})-({yesterday})
        </th>
      </tr>

      <tbody>
        {data?.name?.length != 0 ? (
          data.name.map((i, index) => (
            <tr className="report-row">
              <td>
                {" "}
                <b>{i}</b>
              </td>
              <td>{data.current[index]}</td>
              <td>{data.upto[index]}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3}>Empty Data</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ReportAudit;
