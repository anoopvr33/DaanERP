import { Fragment, useEffect, useState } from "react";
import "./style.css";
import FormItems from "../formItems";
import Button from "../button";
import { useDispatch, useSelector } from "react-redux";
import { getBookingData } from "../../redux/bookingSlice";

const BookingTable = () => {
  const [expand, setExpand] = useState({ row: null, open: false });

  const { items, error, loading } = useSelector((state) => state.booking);

  useEffect(() => {
    console.log("my table content", items.data, error);
  }, [items, error, loading]);

  if (error) {
    return <h1 className="booking-error">Error occured!</h1>;
  }

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <table className="booking-table" border={1}>
      <tr>
        <th>Date</th>
        <th>Customer</th>
        <th>Mob.No</th>
        <th>Email</th>
        <th>Amount</th>
        <th>Hotels</th>
        <th></th>
      </tr>
      <tbody>
        {items?.data?.length === 0 ? (
          <p className="no-data">No Data Available</p>
        ) : (
          items?.data?.map((i, index) => (
            <Fragment>
              <tr
                className="booking-row"
                style={{
                  background: `${expand.row == index && expand.open ? "#f5f5ff" : ""}`,
                }}
              >
                <td>{i.created_at}</td>
                <td>{i.customer_name}</td>
                <td>{i.phone_number}</td>
                <td>{i.email}</td>
                <td>{i.total_amount}</td>
                <td style={{ fontWeight: "500", color: "#7070a3" }}>
                  {i.hotel}
                </td>
                <td
                  onClick={() => setExpand({ row: index, open: !expand.open })}
                >
                  {expand.open && expand.row == index ? (
                    <i class="fa-solid fa-angle-up"></i>
                  ) : (
                    <i class="fa-solid fa-angle-down"></i>
                  )}
                </td>
              </tr>
              {expand.row == index && expand.open && (
                <tr
                  style={{
                    padding: "30px",
                    background: `${expand.row == index && expand.open ? "#f5f5ff" : ""}`,
                  }}
                >
                  <td
                    colSpan={7}
                    style={{ backgroundColor: "", padding: "20px 10px" }}
                  >
                    <div className="booking-expand">
                      <p>
                        <b>Hotel</b> <span>{i.hotel}</span>
                      </p>
                      <p>
                        <b>Customer</b> <span> {i.customer_name}</span>
                      </p>
                      <p>
                        <b>Phone no</b> <span> {i.phone_number}</span>
                      </p>
                      <p>
                        <b>Email</b> <span> {i.email ? i.email : ""}</span>
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
                      <p className="booking-upt">
                        <span>Update</span> <span>Delete</span>{" "}
                      </p>
                      {/* <p className="booking-upt">
                        <text>Update</text>
                        <text>Delete</text>
                      </p> */}

                      {/* <Button child={"Update"}></Button>
                      <Button child={"Delete"}></Button> */}
                    </div>
                  </td>
                </tr>
              )}
            </Fragment>
          ))
        )}
      </tbody>
    </table>
  );
};

export default BookingTable;
