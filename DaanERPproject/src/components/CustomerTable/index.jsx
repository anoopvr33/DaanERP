import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { Fragment, useEffect, useMemo, useState } from "react";
import { getCustomerData } from "../../redux/customerSlice";

const CustomerTable = ({ date, count, items }) => {
  const dispatch = useDispatch();

  const [expand, setExpand] = useState({ row: null, open: false });

  const [array, setArray] = useState([]);

  const sortedArray = useMemo(() => {
    console.log("okkkkkk");
    if (!Array.isArray(array)) return [];

    if (count === "Less Count") {
      return [...array].sort(
        (a, b) => a.total_booking_counts - b.total_booking_counts,
      );
    }

    if (count === "More Count") {
      console.log("finneee ok");
      return [...array].sort(
        (a, b) => b.total_booking_counts - a.total_booking_counts,
      );
    }

    return array;
  }, [count]);

  useEffect(() => {
    console.log("my customer", items);
    setArray(items.data);
  }, [items]);

  useEffect(() => {}, [count]);

  useEffect(() => {
    console.log("sorted arra", sortedArray);
    setArray(sortedArray);
  }, [sortedArray]);

  useEffect(() => {
    console.log("arrraa", array);
  }, [array]);

  console.log("my dateee", date);
  return (
    <table className="customer-table" border={1}>
      <tr>
        {/* <th>ID</th> */}
        <th>Fisrt Name</th>
        <th>Last Name</th>
        <th>Mob.No</th>
        <th>Email</th>
        <th>Count</th>
        <th>Total Revenue</th>
        <th>last_booking_date</th>
        <th>Last Booking Details</th>
      </tr>
      <tbody>
        {array.length > 0 ? (
          array.map((i, index) => (
            <Fragment key={`${i.email}-${i.phone}-${i.last_booking_date}`}>
              <tr
                style={{
                  background: `${expand.row == index && expand.open ? "#f5f5ff" : ""}`,
                }}
              >
                {/* <td>{i.id}</td>/ */}
                <td>{i.firstName}</td>
                <td>{i.lastName}</td>
                <td>{i.phone}</td>
                <td>{i.email}</td>
                <td>{i.total_booking_counts}</td>
                <td>{i.total_revenue?.toFixed(2)}</td>
                <td>{i.last_booking_date}</td>
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
                  <td colSpan={7}>
                    <div className="customer-expand">
                      <table>
                        <tr>
                          <th>Booking ID</th>
                          <th>Check In</th>
                          <th>Check Out</th>
                          <th>Hotel</th>
                          <th>Meal Plan</th>
                          <th>Payment Mode</th>
                          <th>Booking Source</th>
                        </tr>
                        <tbody>
                          <tr>
                            <td>{i.last_booking_details.bookingId}</td>
                            <td>
                              {new Date(
                                i.last_booking_details.checkin,
                              ).toLocaleString()}
                            </td>
                            <td>
                              {new Date(
                                i.last_booking_details.checkout,
                              ).toLocaleString()}
                            </td>
                            <td>{i.last_booking_details.hotelCode}</td>
                            <td>{i.last_booking_details.mealPlan}</td>
                            <td>{i.last_booking_details.paymentMode}</td>
                            <td>{i.last_booking_details.channel}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}
            </Fragment>
          ))
        ) : (
          <tr>
            <td colSpan={8}>Empty Data</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default CustomerTable;
