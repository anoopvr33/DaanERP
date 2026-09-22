import { Fragment, useState } from "react";
import "./style.css";
import { notSuper, trueStaff } from "../../utils";
import BudgetEdit from "../accountsEdit/budgetEdit";
import { deleteAccount } from "../../api/accountsServices";
import { PageinationUI } from "../Elements/pagination";
import Pagination from "@mui/material/Pagination";

const AccountsPos = ({ data }) => {
  const [edit, setEdit] = useState(null);

  const [page, setPage] = useState(1);

  const { paginatedData, totalPages } = PageinationUI(data?.data, page);

  return (
    <>
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
          {paginatedData?.length > 0 ? (
            <>
              {paginatedData
                .map((item, index) => (
                  <Fragment key={index}>
                    <tr className="accounts-row">
                      <td>{item.sub_category}</td>
                      <td>{item.hotel ? item.hotel : "_"}</td>
                      <td>{item.budget_amount}</td>
                      <td>{item.actual_amount}</td>
                      <td>
                        <i
                          onClick={() => setEdit(index)}
                          style={{
                            display: `${trueStaff ? "none" : ""}`,
                          }}
                          class="fa fa-edit"
                          aria-hidden="true"
                        ></i>
                        <br />
                        <i
                          onClick={() =>
                            deleteAccount("/daybook/delete_budget/", item.id)
                          }
                          style={{
                            display: `${notSuper || trueStaff ? "none" : ""}`,
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
                  </Fragment>
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "20px",
        }}
      >
        <Pagination
          count={totalPages}
          page={page}
          onChange={(event, value) => setPage(value)}
        />
      </div>
    </>
  );
};

export default AccountsPos;
