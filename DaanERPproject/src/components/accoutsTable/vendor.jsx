import { useEffect, useState } from "react";
import { API } from "../../utils/axios";
import "./style.css";
import { IsStaff, IsSuper } from "../../utils";
import VendorEdit from "../accountsEdit/vendorEdit";

const AccountsVendor = ({ vendor }) => {
  // const [vendor, setVendor] = useState([]);
  const [edit, setEdit] = useState(false);
  return (
    <table className="daan-table">
      <tr>
        <th>Name</th>
        <th>Bill No</th>
        <th>Bill Date</th>
        <th>Amount</th>
        <th>Remark</th>
        <th>Payment Date</th>
        <th>Due Date</th>
        <th>Hotel</th>
        <th>File</th>
        <th>Action</th>
      </tr>

      <tbody>
        {edit && <VendorEdit setEdit={setEdit}></VendorEdit>}
        {vendor.length > 0 ? (
          vendor.map((item) => (
            <tr className="accounts-row">
              <td>{item.name}</td>
              <td>{item.bill_no}</td>
              <td>{item.date}</td>
              <td>{item.amount}</td>
              <td>{item.remarks}</td>
              <td>{item.payment_date}</td>
              <td>{item.due_date}</td>
              <td>{item.hotel}</td>
              <td>
                {item.file_path ? (
                  <a
                    href={`${item.file_path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View File
                  </a>
                ) : (
                  "_"
                )}
              </td>
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
        ) : (
          <tr>
            <td colSpan={9}> Empty Data </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default AccountsVendor;
