import { useEffect } from "react";
import "./style.css";

const AccountsPos = ({ data, type }) => {
  const head = data.length > 0 ? Object.keys(data[0]) : [];

  // if (data.length === 0) {
  //   return <p>Loading...</p>;

  // }
  useEffect(() => {
    console.log("daa", data);
  }, [data]);

  return (
    <table
      style={{ width: "900px", textAlign: "start" }}
      className="daan-table"
    >
      <tr>
        <th>{data.category}</th>
        <th>Hotel</th>
        <th>Budget Amt</th>
        <th>Actual Amt</th>
      </tr>

      <tbody>
        {/* <td>1</td>
        <td>rent</td>
        <td>344</td>
        <td>Expense</td>
        <td>null</td> */}
        {data.data.length > 0 ? (
          <>
            {data.data
              .map((item) => (
                <tr className="accounts-row">
                  {/* <td>{item.date}</td> */}
                  <td>{item.sub_category}</td>
                  <td>{item.hotel ? item.hotel : "_"}</td>
                  {/* <td>{item.sub_category}</td> */}
                  <td>{item.budget_amount}</td>
                  {/* <td>{type === "EX" ? item.amount : "_"}</td> */}
                  {/* <td>{type == "IN" ? item.amount : "_"}</td> */}
                  <td>{item.actual_amount}</td>
                </tr>
              ))
              .reverse()}
            <tr>
              <td>
                <b>Total</b>
              </td>
              <td></td>
              <td>
                <b>{data.total_budget}</b>
              </td>
              <td>
                <b>{data.total_actual}</b>
              </td>
            </tr>
          </>
        ) : (
          <tr>
            <td colSpan={4}>Empty Data</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default AccountsPos;
