import { Fragment, useState } from "react";
import "./style.css";
import { useSelector } from "react-redux";
import AddBookindCheck from "../BookingCheckAdd";
import AddBookindCheckOut from "../BookingCheckAdd/checkout";
import BookingEdit from "../bookingEdit";
import ErrorPage from "../Elements/Error";
import { DeleteBookingDataAPI } from "../../api";
import { IsStaff, IsSuper } from "../../utils";
import { SearchFilter } from "../Elements/searchFilter";
import LoadingItem from "../Elements/Loading";
import Button from "../Elements/button";

const BookingTable = ({ status, setPage, page }) => {
  const [expand, setExpand] = useState({ row: null, open: false });
  const [open, setOpen] = useState({ index: null, check: null });
  const [edit, setEdit] = useState(null);

  const Delete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure want to delete this booking?",
    );

    if (!confirmed) return;
    try {
      const res = await DeleteBookingDataAPI(id);
      if (res.data.status === "success") {
        alert("successflly deleted");
      } else alert("please login or some error");
    } catch (error) {
      alert("delete error", error);
    }
  };

  const { items, geterror, loading } = useSelector((state) => state.booking);

  const { inputValue } = useSelector((state) => state.search);

  const { FilterData } = SearchFilter(items, inputValue, status);

  if (loading && !geterror) {
    return <LoadingItem></LoadingItem>;
  }

  return (
    <>
      <table className="daan-table">
        <tr>
          <th>Date</th>
          <th>Booking ID</th>
          <th>Source</th>
          <th>Customer</th>
          <th>Mob.No</th>
          <th>Room No.</th>
          <th>Rate Plan</th>
          <th>Check In</th>
          <th>Check Out</th>
          <th>Amount</th>
          <th>Payment</th>
          <th>Status</th>
          <th>Action</th>
          <th></th>
        </tr>
        <tbody>
          {!items || geterror ? (
            <tr>
              <td colSpan={15} style={{ padding: "20px 0px" }}>
                <ErrorPage></ErrorPage>
              </td>
            </tr>
          ) : FilterData?.length === 0 ? (
            <tr>
              <td colSpan={13}> Empty Data </td>
            </tr>
          ) : (
            FilterData?.map((i, index) => (
              <Fragment>
                {open.index === index &&
                  (!open.check && open.check === false ? (
                    <AddBookindCheck
                      customer={i.name}
                      bookid={i.booking_id}
                      hotelId={i.hotel_code}
                      checkIn={i.checkin_date}
                      guest={i.adults + i.children}
                      setOpen={setOpen}
                    ></AddBookindCheck>
                  ) : (
                    <AddBookindCheckOut
                      customer={i.name}
                      bookid={i.booking_id}
                      hotelId={i.hotel_code}
                      guest={i.adults + i.children}
                      setOpen={setOpen}
                    />
                  ))}
                {edit === index && (
                  <BookingEdit
                    phone={i.phone}
                    customer={i.name}
                    checkIn={i.checkin_date}
                    adult={i.adults}
                    child={i.children}
                    payment={i.paymentMode}
                    meal={i.meal_plan}
                    room={i.room_category}
                    total={i.total_amount}
                    checkout={i.checkout_date}
                    status={i.tag_status}
                    id={i.id}
                    gstno={i.gst_number}
                    setEdit={setEdit}
                  />
                )}
                <tr
                  className="booking-row"
                  style={{
                    background: `${expand.row == index && expand.open ? "#ffffff" : ""}`,
                  }}
                >
                  <td>{i?.booking_date}</td>
                  <td>{i?.booking_id}</td>
                  <td style={{ fontWeight: "500", color: "#7070a3" }}>
                    {i.booking_source}
                  </td>
                  <td>{i.name}</td>
                  <td>{i.phone}</td>
                  <td>{i.room_number || "_"}</td>
                  <td>{i.rateplanCode || "_"}</td>
                  <td>
                    {i.checkin_date === "" || !i.checkin_date ? (
                      <button
                        disabled={IsSuper() === false}
                        style={{ padding: "2px 10px", fontSize: "12px" }}
                        onClick={() => setOpen({ index: index, check: false })}
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
                        disabled={IsSuper() === false}
                        style={{ padding: "2px 10px", fontSize: "12px" }}
                        onClick={() => setOpen({ index: index, check: true })}
                      >
                        Add
                      </button>
                    ) : (
                      i.checkout_date
                    )}
                  </td>

                  <td>{i?.total_amount?.toFixed(2)}</td>
                  <td>{i.paymentMode || "-"}</td>
                  <td
                    style={{
                      color:
                        i.tag_status === "Cancelled"
                          ? "red"
                          : i.tag_status === "Confirmed"
                            ? "rgb(74, 194, 74)"
                            : i.tag_status === "Checked Out"
                              ? "rgb(24, 124, 255)"
                              : "",
                    }}
                  >
                    {i.tag_status}
                  </td>

                  <td>
                    <i
                      onClick={() => setEdit(index)}
                      class="fa fa-edit"
                      aria-hidden="true"
                    ></i>
                    <i
                      onClick={() => Delete(i.id)}
                      style={{
                        display: `${IsSuper() === false || IsStaff() === true ? "none" : ""}`,
                      }}
                      class="fa fa-trash"
                      aria-hidden="true"
                    ></i>
                  </td>
                  <td
                    onClick={() =>
                      setExpand({ row: expand.row == index ? null : index })
                    }
                  >
                    {expand.row == index ? (
                      <i
                        style={{ background: "#eaf1ef" }}
                        class="fa-solid fa-angle-up"
                      ></i>
                    ) : (
                      <i class="fa-solid fa-angle-down"></i>
                    )}
                  </td>
                </tr>
                {expand.row == index && (
                  <tr
                    style={{
                      padding: "30px",
                      background: `${expand.row == index ? "#ffffff00" : ""}`,
                    }}
                  >
                    <td colSpan={15} style={{ padding: "20px 10px" }}>
                      <div className="daan-expand">
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
                            room_count <span>{i.room_count}</span>
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
                        <p>
                          <b>
                            GST No. <span>{i.gst_number || "_"}</span>
                          </b>
                        </p>
                        <p>
                          <b>Invoice</b>
                          <span>
                            {i.invoice_pdf ? (
                              <a
                                href={i.invoice_pdf}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                view file
                              </a>
                            ) : (
                              "Null"
                            )}
                          </span>
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))
          )}
        </tbody>
      </table>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <a
          style={{
            textDecoration: "underline",
            fontStyle: "italic",
            color: "#026e7e",
          }}
          child={"Prev"}
          onClick={() => setPage(page === 1 ? 1 : page - 1)}
        >
          Prev page
        </a>

        {page}
        <a
          style={{
            textDecoration: "underline",
            fontStyle: "italic",
            color: "#026e7e",
          }}
          child={"Next"}
          onClick={() => setPage(page + 1)}
        >
          Next page
        </a>
      </div>
      <br />
      <br />
    </>
  );
};

export default BookingTable;
