import { Fragment, useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { getBookingData } from "../../redux/bookingSlice";

const BookingTable = () => {
  const [expand, setExpand] = useState({ row: null, open: false });

  const { items, error, loading } = useSelector((state) => state.booking);

  useEffect(() => {
    console.log("my table content", items, error);
  }, [items, error, loading]);

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <table className="booking-table" border={1}>
      <tr>
        <th>Booking Date</th>
        <th>Booking ID</th>
        <th>Check In</th>
        <th>Check Out</th>
        <th>Amount</th>
        <th>Payment Mode</th>
        <th>Meal Plan</th>
        <th>Room Cat.</th>
        <th>Customer</th>
        <th>Mob.No</th>
        <th>Booking Source</th>
        <th>Gst No.</th>
        <th>Invoice</th>
        <th></th>
      </tr>
      <tbody>
        {!items || error ? (
          <tr>
            {" "}
            <td colSpan={11}> Please Login or Something wrong </td>{" "}
          </tr>
        ) : items?.data?.length === 0 ? (
          <tr>
            <td colSpan={11}> Empty Data </td>{" "}
          </tr>
        ) : (
          items?.data?.map((i, index) => (
            <Fragment>
              <tr
                className="booking-row"
                style={{
                  background: `${expand.row == index && expand.open ? "#ffffff" : ""}`,
                }}
              >
                <td>{i?.booking_date}</td>
                <td>{i?.booking_id}</td>
                <td>{i.checkin_date}</td>
                <td>{i.checkout_date}</td>
                {/* <td>{i.paymentMode}</td> */}
                <td>{i?.total_amount?.toFixed(2)}</td>
                <td>{i.payment_mode ? i.payment_mode : "check field"}</td>
                <td>{i.meal_plan}</td>
                <td>{i.room_category}</td>
                <td>{i.name}</td>

                <td>{i.phone}</td>

                <td style={{ fontWeight: "500", color: "#7070a3" }}>
                  {i.booking_source}
                </td>
                <td>{i.gst_number ? i.gst_number : "Null"}</td>

                <td>
                  {i.invoice_pdf ? (
                    <a
                      href={i.invoice_pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Invoice
                    </a>
                  ) : (
                    "Null"
                  )}
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
                    background: `${expand.row == index && expand.open ? "#ffffff" : ""}`,
                  }}
                >
                  <td
                    colSpan={14}
                    style={{ backgroundColor: "", padding: "20px 10px" }}
                  >
                    <div className="booking-expand">
                      <p>
                        <b>Adults</b> <span> 23 {i.adults}</span>
                      </p>
                      <p>
                        <b>Children</b> <span> {i.children}</span>
                      </p>
                      <p>
                        <b>
                          room_category <span>{i.room_category}</span>
                        </b>
                      </p>
                      {/* <p>
                        <b>
                          segment <span>{i.segment}</span>
                        </b>
                      </p> */}
                      <p>
                        <b>
                          pah{" "}
                          <span>
                            {i.pah === false ? "completed" : "pending"}
                          </span>
                        </b>
                      </p>
                      {/* <p>
                        <b>
                          specialRequests <span>{i.specialRequests}</span>
                        </b>
                      </p> */}
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
