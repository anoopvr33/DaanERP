import { useState } from "react";
import { Pageination } from "../Elements/pagination";
import "./style.css";
import Pagination from "@mui/material/Pagination";

const ReportRevenue = ({ data }) => {
  const [page, setPage] = useState(1);

  const head = data?.length > 0 ? Object.keys(data[0]) : [];

  const { paginatedData, totalPages } = Pageination(data, page);

  console.log("my daaaaa", data);

  return (
    <>
      <table className="daan-table">
        <tr>
          {paginatedData?.length != 0 ? (
            Object.keys(paginatedData[0]).map((key) => <th>{key}</th>)
          ) : (
            <th>Empty Data</th>
          )}
        </tr>
        <tbody>
          {paginatedData?.length > 0 &&
            paginatedData.map((item, index) => (
              <tr>
                {paginatedData?.length > 0 ? (
                  Object.values(paginatedData[index]).map((i) => <td>{i}</td>)
                ) : (
                  <td>Empty data</td>
                )}
              </tr>
            ))}
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

export default ReportRevenue;
