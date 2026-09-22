import { useState } from "react";
import { notSuper, trueStaff } from "../../utils";
import "./style.css";
import DailyLogEdit from "../accountsEdit/dailyLogEdit";
import { deleteAccount } from "../../api/accountsServices";
import { PageinationUI } from "../Elements/pagination";
import Pagination from "@mui/material/Pagination";

const AccountsTable = ({ data }) => {
  const [edit, setEdit] = useState(null);

  const [page, setPage] = useState(1);

  const { paginatedData, totalPages } = PageinationUI(data, page);

  // console.log("my daily log",data)

  return (
    <>
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
          {data.length > 0 ? (
            paginatedData
              .map((item, index) => (
                <>
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
                        onClick={() => setEdit(index)}
                        style={{
                          display: `${trueStaff ? "none" : ""}`,
                        }}
                        class="fa fa-edit"
                        aria-hidden="true"
                      ></i>{" "}
                      <br />
                      <i
                        onClick={() =>
                          deleteAccount("/daybook/delete_daybook_log/", item.id)
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
                    <DailyLogEdit
                      _id={item.id}
                      category={item.category}
                      sub_cat={item.sub_category}
                      receipt={item.receipts}
                      payment={item.payments}
                      balance={item.balance}
                      hotel={item.hotel}
                      desc={item.description}
                      bank={item.bank}
                      setEdit={setEdit}
                    ></DailyLogEdit>
                  )}
                </>
              ))
              .reverse()
          ) : (
            <tr>
              <td colSpan={8}>Empty Data</td>
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

export default AccountsTable;
