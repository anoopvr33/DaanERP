import { Fragment, useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { getBookingData } from "../../redux/bookingSlice";
import AddBookindCheck from "../BookingCheckAdd";
import AddBookindCheckOut from "../BookingCheckAdd/checkout";

const BookingTable = () => {
  const [expand, setExpand] = useState({ row: null, open: false });
  const [open, setOpen] = useState({ index: null, check: null });

  const { items, error, loading } = useSelector((state) => state.booking);

  useEffect(() => {
    console.log("my table content", items, error);
  }, [items, error, loading]);

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <>
      <table className="booking-table" border={1}>
        <tr>
          <th>Booking Date</th>
          <th>Booking ID</th>
          <th>Check In</th>
          <th>Check Out</th>
          <th>Amount</th>
          <th>Payment Mode</th>
          <th>Rate Plan Code</th>
          {/* <th>Meal Plan</th> */}
          <th>Room Cat.</th>
          <th>Customer</th>
          <th>Mob.No</th>
          <th>Booking Source</th>
          <th>Gst No.</th>
          <th>Invoice</th>
          <th>Action</th>
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
              <td colSpan={13}> Empty Data </td>
            </tr>
          ) : (
            items?.data
              ?.map((i, index) => (
                <Fragment>
                  {open.index === index &&
                    (!open.check && open.check === false ? (
                      <AddBookindCheck
                        customer={i.name}
                        bookid={i.booking_id}
                        hotelId={i.hotel_code}
                        checkIn={i.checkin_date}
                        setOpen={setOpen}
                      ></AddBookindCheck>
                    ) : (
                      <AddBookindCheckOut
                        customer={i.name}
                        bookid={i.booking_id}
                        hotelId={i.hotel_code}
                        setOpen={setOpen}
                      />
                    ))}
                  <tr
                    className="booking-row"
                    style={{
                      background: `${expand.row == index && expand.open ? "#ffffff" : ""}`,
                    }}
                  >
                    <td>{i?.booking_date}</td>
                    <td>{i?.booking_id}</td>
                    <td>
                      {i.checkin_date === "" || !i.checkout_date ? (
                        <button
                          style={{ padding: "2px 10px", fontSize: "12px" }}
                          onClick={() =>
                            setOpen({ index: index, check: false })
                          }
                        >
                          Add
                        </button>
                      ) : (
                        i.checkin_date
                      )}
                    </td>
                    <td>
                      {i.checkout_date === "" || !i.checkout_date ? (
                        <button
                          style={{ padding: "2px 10px", fontSize: "12px" }}
                          onClick={() => setOpen({ index: index, check: true })}
                        >
                          Add
                        </button>
                      ) : (
                        i.checkout_date
                      )}
                    </td>
                    {/* <td>{i.paymentMode}</td> */}
                    <td>{i?.total_amount?.toFixed(2)}</td>
                    <td>{i.paymentMode || "-"}</td>
                    <td>{i.rateplanCode || "_"}</td>
                    {/* <td>{i.meal_plan || "-"}</td> */}
                    <td>{i.room_category || "_"}</td>
                    <td>{i.name}</td>

                    <td>{i.phone}</td>

                    <td style={{ fontWeight: "500", color: "#7070a3" }}>
                      {i.booking_source}
                    </td>
                    <td>{i.gst_number || "_"}</td>

                    <td>
                      {i.invoice_pdf ? (
                        <a
                          href={i.invoice_pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          view
                        </a>
                      ) : (
                        "Null"
                      )}
                    </td>
                    <td>
                      {" "}
                      <i class="fa fa-edit" aria-hidden="true"></i>{" "}
                      <i class="fa fa-trash" aria-hidden="true"></i>{" "}
                    </td>
                    <td
                      onClick={() =>
                        setExpand({ row: index, open: !expand.open })
                      }
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
                        colSpan={15}
                        style={{ backgroundColor: "", padding: "20px 10px" }}
                      >
                        <div className="booking-expand">
                          <p>
                            <b>Adults</b> <span> {i.adults}</span>
                          </p>
                          <p>
                            <b>Children</b> <span> {i.children}</span>
                          </p>
                          <p>
                            <b>
                              room_category <span>{i.room_category}</span>
                            </b>
                          </p>
                          <p>
                            <b>
                              Hotel Code <span>{i.hotel_code}</span>
                            </b>
                          </p>
                          <p>
                            <b>
                              pah
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
              .reverse()
          )}
        </tbody>
      </table>
    </>
  );
};

export default BookingTable;
