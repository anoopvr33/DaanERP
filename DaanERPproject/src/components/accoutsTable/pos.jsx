import { useState } from "react";
import "./style.css";
import { IsStaff, IsSuper } from "../../utils";
import BudgetEdit from "../accountsEdit/budgetEdit";

const AccountsPos = ({ data }) => {
  const [edit, setEdit] = useState(null);

  return (
    <table
      style={{ width: "900px", textAlign: "start", marginBottom: "20px" }}
      className="daan-table"
    >
      <thead>
        <tr>
          <th>{data.category}</th>
          <th>Hotel</th>
          <th>Budget Amt</th>
          <th>Actual Amt</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {data.data.length > 0 ? (
          <>
            {data?.data
              .map((item, index) => (
                <>
                  <tr className="accounts-row">
                    <td>{item.sub_category}</td>
                    <td>{item.hotel ? item.hotel : "_"}</td>
                    <td>{item.budget_amount}</td>
                    <td>{item.actual_amount}</td>
                    <td>
                      <i
                        onClick={() => setEdit(index)}
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
                  {edit === index && (
                    <BudgetEdit
                      _id={item.id}
                      hotel={item.hotel}
                      category={data.category}
                      sub_cat={item.sub_category}
                      budget={item.budget_amount}
                      actual={item.actual_amount}
                      setEdit={setEdit}
                    ></BudgetEdit>
                  )}
                </>
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
              <td></td>
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
