import { useEffect, useState } from "react";
import { API } from "../../utils/axios";
import "./style.css";

const AccountsVendor = ({ yesterdate, trigger, prevMonth, hotels }) => {
  // const head = data.length > 0 ? Object.keys(data[0]) : [];

  const [vendor, setVendor] = useState([]);

  const GetVendor = async () => {
    console.log("vendor date", yesterdate, prevMonth, hotels);
    const res = await API.post("/daybook/get_vendor_payout/", {
      from_date: prevMonth,
      to_date: yesterdate,
      hotel: hotels,
    });
    console.log("vendor", res);
    setVendor(res?.data?.data);
  };

  useEffect(() => {
    GetVendor();
  }, [trigger]);

  return (
    <table className="accounts-table">
      <tr>
        <th>Name</th>
        <th>Bill No</th>
        <th>Bill Date</th>
        {/* <th>Vendor Name</th> */}
        <th>Amount</th>
        <th>Remark</th>
        <th>Payment Date</th>
        <th>Due Date</th>
        <th>Hotel</th>
        <th>File</th>
        {/* <th>Invoice</th>  */}
      </tr>

      <tbody>
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
              {/* <td>{item?.transaction_type == "EX" ? item.amount : "_"}</td>
              <td>{item?.transaction_type == "IN" ? item.amount : "_"}</td> */}
              {/* <td>{item.remarks}</td> */}
            </tr>
          ))
        ) : (
          <tr>
            {" "}
            <td colSpan={9}> Empty Data </td>{" "}
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default AccountsVendor;
