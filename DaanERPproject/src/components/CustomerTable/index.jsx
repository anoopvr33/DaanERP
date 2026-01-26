import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { Fragment, useEffect, useState } from "react";
import { getCustomerData } from "../../redux/customerSlice";

const CustomerTable = () => {
  const [expand, setExpand] = useState({ row: null, open: false });
  const dispatch = useDispatch();
  const { items, error, loading } = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(getCustomerData());
  }, []);

  useEffect(() => {
    console.log("my customer", items);
  }, [items]);
  return (
    <table className="customer-table" border={1}>
      <tr>
        <th>ID</th>
        <th>Customer</th>
        <th>Mob.No</th>
        <th>Email</th>
        <th>Count</th>
        <th>Booking History</th>
      </tr>
      <tbody>
        {!items?.data?.length == 0
          ? items?.data?.map((i, index) => (
              <Fragment>
                <tr
                  style={{
                    background: `${expand.row == index && expand.open ? "#f5f5ff" : ""}`,
                  }}
                >
                  <td>{i.id}</td>
                  <td>{i.name}</td>
                  <td>{i.phone_number}</td>
                  <td>{i.email}</td>
                  <td>{i.booking_count}</td>{" "}
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
                      background: `${expand.row == index && expand.open ? "#f5f5ff" : ""}`,
                    }}
                  >
                    <td colSpan={6}>
                      <div className="customer-expand">
                        <table>
                          <tr>
                            <th>Booking ID</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Hotel</th>
                          </tr>
                          <tbody>
                            {i.booking_history.map((item, index) => (
                              <tr>
                                <td>{item.booking_id}</td>
                                <td>
                                  {" "}
                                  {new Date(item.created_at).toLocaleString()}
                                </td>
                                <td>{item.amount}</td>
                                <td>{item.hotel}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))
          : ""}
      </tbody>
    </table>
  );
};

export default CustomerTable;
