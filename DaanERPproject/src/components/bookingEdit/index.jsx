import { Fragment, useEffect, useState } from "react";
import FormItems from "../Elements/formItems";
import Button from "../Elements/button";
import "./style.css";
import { API } from "../../utils/axios";
import {
  AddBooking_CheckIn,
  AddBooking_CheckOut,
  EditBookingDataAPI,
} from "../../api";

const PaymentModeOptions = [
  {
    name: "Select Payment Mode",
    value: "",
  },
  {
    name: "Cash",
    value: "Cash",
  },
  {
    name: "Bill to Company",
    value: "Bill to Company",
  },
  {
    name: "UPI to Company",
    value: "UPI to Company",
  },
  {
    name: "UPI to Current",
    value: "UPI to Current",
  },
  {
    name: "Bank Transfer",
    value: "Bank Transfer",
  },
  {
    name: "Outstanding",
    value: "Outstanding",
  },
  {
    name: "Complementary",
    value: "Complementary",
  },
];

const BookingEdit = ({
  setEdit,
  id,
  customer,
  bookid,
  phone,
  checkIn,
  adult,
  child,
  payment,
  meal,
  room,
  total,
  checkout,
}) => {
  //////////////////////////////////////////////// checkin format
  const check = new Date(checkIn);

  const pad = (num) => String(num).padStart(2, "0");

  const checkFinal = checkIn
    ? `${check.getFullYear()}-${pad(check.getMonth() + 1)}-${pad(check.getDate())} ${pad(check.getHours())}:${pad(check.getMinutes())}:${pad(check.getSeconds())}`
    : "";

  ///////////////////////////////////////////////// checkout format
  const checkoutFormat = new Date(checkout);

  const padtwo = (num) => String(num).padStart(2, "0");

  const checkoutFinal = checkout
    ? `${checkoutFormat.getFullYear()}-${padtwo(checkoutFormat.getMonth() + 1)}-${padtwo(checkoutFormat.getDate())} ${padtwo(checkoutFormat.getHours())}:${padtwo(checkoutFormat.getMinutes())}:${padtwo(checkoutFormat.getSeconds())}`
    : "";

  const [data, setData] = useState({
    customer_name: customer,
    phone_number: phone,
    checkin_date: checkFinal,
    checkout_date: checkoutFinal,
    adults: adult,
    children: child,
    total_amount: total,
    payment_mode: payment,
    meal_plan: meal,
    room_category: room,
  });

  const OnSubmit = async () => {
    console.log("booking edit data final", data);
    // try {
    //   const response = await EditBookingDataAPI(data, id);
    //   console.log("book edit respose", response);

    //   if (response.data.success === true) {
    //     return alert("successfully updated");
    //   } else throw response.data.message || "Error";
    // } catch (error) {
    //   alert(error);
    // }
  };

  // const formatDateTimeLocal = (dateString) => {
  //   const date = new Date(dateString);

  //   const pad = (n) => String(n).padStart(2, "0");

  //   return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
  //     date.getDate(),
  //   )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  // };

  const OnChange = (e) => {
    const { name, value } = e.target;

    if (name === "checkin_date" || name === "checkout_date") {
      const dateObj = new Date(value);

      const pad = (num) => String(num).padStart(2, "0");

      const final = `${dateObj.getFullYear()}-${pad(dateObj.getMonth() + 1)}-${pad(dateObj.getDate())} ${pad(dateObj.getHours())}:${pad(dateObj.getMinutes())}:${pad(dateObj.getSeconds())}`;

      setData({
        ...data,

        [name]: final,
      });

      return;
    }

    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    console.log("booking edit data", data);
  }, [data]);

  return (
    <div className="booking-check">
      <i
        onClick={() => setEdit(null)}
        style={{ margin: "auto", marginRight: "0px" }}
        class="fa-regular fa-circle-xmark"
      ></i>
      {<h2>Edit Booking</h2>}
      <p>Customer : {customer}</p>
      <p>Booking ID : {bookid}</p> <br />
      <div>
        <FormItems
          onChange={(e) =>
            setData({
              ...data,

              customer_name: e.target.value,
            })
          }
          labelData={"customer_name"}
          value={data.customer_name}
          name="customer_name"
        ></FormItems>
        <FormItems
          onChange={(e) =>
            setData({
              ...data,
              phone_number: e.target.value,
            })
          }
          labelData={"phone_number"}
          value={data.phone_number}
          name="phone_number"
        ></FormItems>
        <FormItems
          onChange={(e) =>
            setData({
              ...data,
              meal_plan: e.target.value,
            })
          }
          value={data.meal_plan}
          element="select"
          option={[`${data.meal_plan}`, "DEL", "STD", "Deluxe Room"]}
          labelData={"meal_plan"}
          name="meal_plan"
        ></FormItems>
        <FormItems
          onChange={(e) =>
            setData({
              ...data,
              room_category: e.target.value,
            })
          }
          element="select"
          option={[`${data.room_category}`, "DEL", "STD", "Deluxe Room"]}
          labelData={"room_category"}
          name="room_category"
        ></FormItems>
        <FormItems
          onChange={(e) =>
            setData({
              ...data,
              adults: Number(e.target.value),
            })
          }
          labelData={"adults"}
          value={data.adults}
          name="adults"
        ></FormItems>{" "}
        <FormItems
          onChange={(e) =>
            setData({
              ...data,
              children: Number(e.target.value),
            })
          }
          labelData={"children"}
          value={data.children}
          name="children"
        ></FormItems>{" "}
        <FormItems
          onChange={(e) =>
            setData({
              ...data,
              total_amount: Number(e.target.value),
            })
          }
          type="number"
          labelData={"total_amount"}
          value={data.total_amount}
          name="total_amount"
        ></FormItems>
        <FormItems
          onChange={OnChange}
          labelData={"checkin_date"}
          type="datetime-local"
          value={data.checkin_date ? data.checkin_date : ""}
          name="checkin_date"
        ></FormItems>
        <FormItems
          onChange={OnChange}
          value={data.checkout_date ? data.checkout_date : ""}
          labelData={"checkout_date"}
          type="datetime-local"
          name="checkout_date"
        ></FormItems>
        <FormItems
          labelData="Payment Mode"
          onChange={(e) =>
            setData({
              ...data,
              payment_mode: e.target.value,
            })
          }
          element="select"
          option={[`${data.payment_mode}`, ...PaymentModeOptions]}
          name={"paymentMode"}
        ></FormItems>
      </div>
      <Button onClick={OnSubmit} child={"Submit"}></Button>
    </div>
  );
};

export default BookingEdit;
