import { useState } from "react";
import { PageinationUI } from "../Elements/pagination";
import "./style.css";
import Pagination from "@mui/material/Pagination";

const AccountsHotel = ({ data }) => {
  const [page, setPage] = useState(1);

  const { paginatedData, totalPages } = PageinationUI(data?.data, page);

  return (
    <>
      <table style={{ width: "700px" }} className="daan-table">
        <tr>
          <th>Category</th>
          <th>Sum of payments</th>
        </tr>

        <tbody>
          {paginatedData?.length > 0 ? (
            <>
              {paginatedData?.map((item) => (
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

export default AccountsHotel;
