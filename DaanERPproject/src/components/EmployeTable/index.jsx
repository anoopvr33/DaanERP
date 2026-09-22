import { Fragment, useEffect, useState } from "react";
import "./style.css";
import { DeleteEmployeeAPI, GetEmployeeAPI } from "../../api/employee";
// import { getBookingData } from "../../redux/bookingSlice";

const EmployeeTable = () => {
  // const [expand, setExpand] = useState({ row: null, open: false });
  const [items, setItems] = useState([]);

  const Delete = async (_id) => {
    const confirmed = window.confirm("Are you sure want to delete this user?");

    if (!confirmed) return;

    DeleteEmployeeAPI(_id).then((res) => {
      if (res.data.status === "success") {
        alert("successflly deleted");
        GetUsers();
      } else alert("please login or some error");
    });
  };

  const GetUsers = async () => {
    GetEmployeeAPI().then((res) => {
      if (res.data.status === "success") {
        setItems(res.data);
      } else alert("please login or some error");
    });
  };

  useEffect(() => {
    GetUsers();
  }, []);

  return (
    <table style={{ width: "900px" }} className="daan-table">
      <tr>
        <th>ID</th>
        <th>Username</th>
        <th>Email </th>
        <th>Position</th>
        <th>is_active</th>
        <th>last_login</th>
        <th>Hotels</th>
        <th></th>
      </tr>
      <tbody>
        {items.length === 0 ? (
          <tr>
            {" "}
            <td colSpan={7}> Empty data or Please Login</td>{" "}
          </tr>
        ) : items?.data?.length === 0 ? (
          <tr>
            <td colSpan={6}> Empty Data </td>{" "}
          </tr>
        ) : (
          items?.data?.map((i, index) => (
            <Fragment key={index}>
              <tr className="employee-row">
                <td>{i.id}</td>
                <td>{i.username}</td>
                <td>{i.email}</td>
                <td>
                  {i.is_superuser ? "Admin" : i.is_staff ? "Staff" : "Manager"}
                </td>

                <td>{i.is_active ? "Yes" : "No"}</td>
                <td style={{ fontWeight: "500", color: "#7070a3" }}>
                  {new Date(i.last_login).toLocaleDateString()}
                </td>
                <td className="hotel-data">
                  Hotels <i class="fa fa-arrow-right" aria-hidden="true"></i>
                  <span className="hotel-hover">
                    {i.hotel_name.map((item, ind) => (
                      <p key={ind} style={{ lineBreak: "anywhere" }}>
                        {item},
                      </p>
                    ))}
                  </span>
                </td>
                <td onClick={() => Delete(i.id)}>delete</td>
              </tr>
            </Fragment>
          ))
        )}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
