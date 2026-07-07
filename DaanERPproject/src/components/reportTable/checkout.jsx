import { useState } from "react";
import { Pageination } from "../Elements/pagination";
import "./style.css";
import Pagination from "@mui/material/Pagination";

const ReportCheckout = ({ data }) => {
  // const head = data.length > 0 ? Object.keys(data[0]) : [];

  const [page, setPage] = useState(1);

 
  const { paginatedData, totalPages } = Pageination(data, page);

  return (
    <>
      <table className="daan-table">
        <tr>
          <th>Guest Name</th>
          <th>Room No.</th>
          <th>CheckIn</th>
          <th>CheckOut</th>
          <th>Total(INR)</th>
          <th>Tax</th>
          <th>Folio No.</th>
          <th>Source</th>
        </tr>

        <tbody>
          {paginatedData?.length > 0 ? (
            paginatedData?.map((item) => (
              <tr className="report-row">
                <td>{item.guest_name}</td>
                <td>{item.room_no}</td>
                <td>{item.checkin}</td>
                <td>{item.checkout}</td>
                <td>{item.amount}</td>
                <td>{item.tax}</td>
                <td>{item.folio_no}</td>
                <td>{item.source}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}> empty data </td>
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

export default ReportCheckout;
