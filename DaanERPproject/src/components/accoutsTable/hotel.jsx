import "./style.css";

const AccountsHotel = ({ data }) => {
  // const head = data.length > 0 ? Object.keys(data[0]) : [];

  // console.log("my hotels ops", data);

  return (
    <table style={{ width: "700px" }} className="daan-table">
      <tr>
        <th>Category</th>
        <th>Sum of payments</th>
      </tr>

      <tbody>
        {data?.data?.length > 0 ? (
          <>
            {data?.data?.map((item) => (
              <tr className="accounts-row">
                <td>{item.category}</td>
                <td>{item.sum_of_payments}</td>
              </tr>
            ))}
            <tr>
              <td>
                <b>Grand Total</b>
              </td>
              <td>
                <b>{data?.grand_total}</b>
              </td>
            </tr>
          </>
        ) : (
          <tr>
            <td colSpan={5}>Empty Data</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default AccountsHotel;
