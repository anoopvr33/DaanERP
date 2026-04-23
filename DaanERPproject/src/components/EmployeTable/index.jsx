import { Fragment, useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { API, getCookie } from "../../utils/axios";
import { elements } from "chart.js";
// import { getBookingData } from "../../redux/bookingSlice";

const EmployeeTable = () => {
  // const [expand, setExpand] = useState({ row: null, open: false });
  const [items, setItems] = useState([]);

  const Delete = async (_id) => {
    try {
      const res = await API.post(
        "/main/delete_user/",
        { id: _id },
        // "/main/profile/",
        {
          withCredentials: true,
          headers: {
            "X-CSRFToken": getCookie("csrftoken"),
          },
        },
      );
      console.log("res user", res);
      if (res.data.status === "success") {
        alert("successflly deleted");
        // setItems(res.data);
      } else alert("please login or some error");
    } catch (error) {
      alert(error);
    }
  };

  const GetUsers = async () => {
    try {
      const res = await API.get(
        "/main/show_user/",
        // "/main/profile/",
        {
          withCredentials: true,
          headers: {
            "X-CSRFToken": getCookie("csrftoken"),
          },
        },
      );
      console.log("res user", res);
      if (res.data) {
        setItems(res.data);
      } else alert("please login");
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    GetUsers();
  }, []);

  useEffect(() => {
    console.log("register", items);
  }, [items]);

  return (
    <table style={{ width: "900px" }} className="booking-table" border={1}>
      <tr>
        <th>ID</th>
        <th>Username</th>
        <th>Email </th>
        <th>is_superuser</th>
        <th>is_active</th>
        <th>last_login</th>
        <th>Hotels</th>
        <th></th>
        {/* <th></th> */}
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
            <Fragment>
              <tr className="booking-row">
                <td>{i.id}</td>
                <td>{i.username}</td>
                <td>{i.email}</td>
                <td>{i.is_superuser ? "Yes" : "No"}</td>
                <td>{i.is_active ? "Yes" : "No"}</td>
                <td style={{ fontWeight: "500", color: "#7070a3" }}>
                  {new Date(i.last_login).toLocaleDateString()}
                </td>
                <td className="hotel-data">
                  Hotels <i class="fa fa-arrow-right" aria-hidden="true"></i>
                  <span className="hotel-hover">
                    {i.hotel_name.map((item, ind) => (
                      <p style={{ lineBreak: "anywhere" }}>{item},</p>
                    ))}
                  </span>
                </td>
                <td onClick={() => Delete(i.id)}>delete</td>
                {/* <td
                  onClick={() => setExpand({ row: index, open: !expand.open })}
                >
                  {expand.open && expand.row == index ? (
                    <i class="fa-solid fa-angle-up"></i>
                  ) : (
                    <i class="fa-solid fa-angle-down"></i>
                  )}
                </td> */}
              </tr>
              {/* {expand.row == index && expand.open && (
                <tr
                  style={{
                    padding: "30px",
                    background: `${expand.row == index && expand.open ? "#ffffff" : ""}`,
                  }}
                >
                  <td
                    colSpan={7}
                    style={{ backgroundColor: "", padding: "20px 10px" }}
                  >
                    <div className="booking-expand">
                      <p>
                        <b>Customer</b> <span> {i.name}</span>
                      </p>
                      <p>
                        <b>Phone no</b> <span> {i.phone}</span>
                      </p>

                      <p>
                        <b>Checkin Date</b> <span>{i.checkin_date}</span>
                      </p>
                      <p>
                        <b>Checkout Date</b> <span> {i.checkout_date}</span>
                      </p>
                      <p>
                        <b>Adults</b> <span> {i.adults}</span>
                      </p>
                      <p>
                        <b>Children</b> <span> {i.children}</span>
                      </p>
                      <p>
                        <b>Total Amount</b> <span>{i.total_amount}</span>
                      </p>
                      <p>
                        <b>Booking Source</b> <span>{i.booking_source}</span>
                      </p>
                      <p>
                        <b>Booking Plan</b> <span>{i.booking_plan}</span>
                      </p>
                    </div>
                  </td>
                </tr>
              )} */}
            </Fragment>
          ))
        )}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
