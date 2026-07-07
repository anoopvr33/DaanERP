import { useState } from "react";
import { Pageination } from "../Elements/pagination";
import "./style.css";
import Pagination from "@mui/material/Pagination";

const BillCompany = ({ result }) => {
  // const head = data.length > 0 ? Object.keys(data[0]) : [];
  const [page, setPage] = useState(1);


  const { paginatedData, totalPages } = Pageination(result, page);

  return (
    <>
      <table className="daan-table">
        <thead>
          <tr className="accounts-row">
            <th>bookingId</th>
            <th>bookedOn</th>
            <th>paymentMode</th>
            <th>debit/credit</th>
            <th>amount</th>
            <th>source</th>
            <th>guest_name</th>
            <th>checkin</th>
            <th>checkout</th>
            <th>room category</th>
          </tr>
        </thead>

        <tbody>
          {Array.isArray(result) && result.length > 0 ? (
            paginatedData
              .map((row) => (
                <tr key={row.id} className="accounts-row">
                  <td>{row.bookingId}</td>
                  <td>{new Date(row.bookedOn).toLocaleString()}</td>
                  <td>{row.paymentMode}</td>
                  <td>{row.debit_credit ? row.debit_credit : "Null"}</td>
                  <td>{row.amount.toFixed(2)}</td>
                  <td>{row.source}</td>
                  <td>{row.guest_name}</td>
                  <td>{row.checkin}</td>
                  <td>{row.checkout}</td>
                  <td>{row.room_code}</td>
                  {/* <td>{row.payment_link ? row.payment_link : "Null"}</td> */}
                </tr>
              ))
              .reverse()
          ) : (
            <tr>
              <td colSpan={9}>Empty Data</td>
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

export default BillCompany;
