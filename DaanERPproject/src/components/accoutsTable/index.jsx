import { useState } from "react";
import { IsStaff, IsSuper } from "../../utils";
import "./style.css";
import DailyLogEdit from "../accountsEdit/dailyLogEdit";

const AccountsTable = ({ data }) => {
  const [edit, setEdit] = useState(false);

  return (
    <table className="daan-table">
      <tr>
        <th>Date</th>
        <th>Category</th>
        <th>Subcategory</th>
        <th>Bank</th>
        <th>Description</th>
        <th>Reciepts</th>
        <th>Payments</th>
        <th>Balance</th>
        <th>Hotel</th>
        <th>Action</th>
      </tr>

      <tbody>
        {edit && <DailyLogEdit setEdit={setEdit}></DailyLogEdit>}
        {data.length > 0 ? (
          data
            .map((item) => (
              <tr className="accounts-row">
                <td>{item.date}</td>
                <td>{item.category}</td>
                <td>{item.sub_category}</td>
                <td>{item.bank}</td>
                <td>{item.description}</td>
                <td>{item.receipts}</td>
                <td>{item.payments}</td>
                <td>{item.balance}</td>
                <td>{item.hotel}</td>
                <td>
                  <i
                    onClick={() => setEdit(!edit)}
                    class="fa fa-edit"
                    aria-hidden="true"
                  ></i>{" "}
                  <br />
                  <i
                    // onClick={() => Delete(i.id)}
                    style={{
                      display: `${IsSuper() === false || IsStaff() === true ? "none" : ""}`,
                    }}
                    class="fa fa-trash"
                    aria-hidden="true"
                  ></i>
                </td>
              </tr>
            ))
            .reverse()
        ) : (
          <tr>
            <td colSpan={8}>Empty Data</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default AccountsTable;
