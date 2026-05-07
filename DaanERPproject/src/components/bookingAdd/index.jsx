import React, { useEffect, useState } from "react";
import FormItems from "../Elements/formItems";
import Button from "../Elements/button";
import "./style.css";
import { useDispatch } from "react-redux";
import { addBookingThunk } from "../../redux/bookingSlice";
import axios from "axios";
import { API } from "../../utils/axios";
import { Hotels } from "../../utils";

const PaymentMode = [
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

const BookingAdd = () => {
  const [data, setData] = useState({
    hotel_code: "",
    customer_name: "",
    phone_number: "",
    email: "",
    checkin_date: "",
    checkout_date: "",
    adults: 0,
    children: 0,
    room_category: "",
    pah: "",
    total_amount: 0,
    payment_mode: "",
    booking_source: "",
    rateplanCode: "",
    booking_plan: "",
    status: "",
    // booking_id: "",
    // invoice_pdf: null,
    gst_number: null,
    booking_date: new Date().toISOString().split("T")[0],
  });

  const dispatch = useDispatch();

  const OnInput = (e) => {
    const { name, value } = e.target;

    if (name === "checkin_date" || name === "checkout_date") {
      const dateObj = new Date(value);

      const formatted = dateObj.toLocaleString("en-IN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      // format fix: convert "16/03/2026, 5:30 am" → "2026-03-16 05:30 AM"
      const [datePart, timePart] = formatted.split(", ");

      const [day, month, year] = datePart.split("/");

      const final = `${year}-${month}-${day} ${timePart.toUpperCase()}`;

      setData({
        ...data,
        [name]: final,
      });
      return;
    }
    setData({ ...data, [name]: value });
  };

  const OnSubmit = async (e) => {
    e.preventDefault();
    console.log("my check vdate", data);
    dispatch(addBookingThunk(data));

    // fetch("https://27abf324a5b5.ngrok-free.app/bookings/booking_create/", {
    //   method: "POST",
    //   body: JSON.stringify(data),
    // })
    //   .then(async (response) => {
    //     if (!response.status == "success") {
    //       // const errorData = await response.json();
    //       // throw errorData;
    //       alert("success");
    //     }
    //     return response.json();
    //   })
    //   .then((result) => {
    //     console.log("Success:", result);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
  };

  useEffect(() => {
    console.log("my data", data);
  }, [data]);

  return (
    <div className="add-book-main">
      <form action="" onSubmit={OnSubmit}>
        <FormItems
          labelData="Booking Date"
          // placeholder={"Hotel"}
          onChange={(e) => {
            const formattedDate = new Date(e.target.value)
              .toISOString()
              .split("T")[0];

            setData({ ...data, booking_date: formattedDate });
          }}
          type="date"
          value={data.booking_date.split("T")[0]}
          name={"booking_date"}
        ></FormItems>

        <FormItems
          labelData="Hotel"
          // placeholder={"Hotel"}
          onChange={OnInput}
          name={"hotel_code"}
          element="select"
          option={["select Hotel", ...Hotels()]}
        ></FormItems>

        <FormItems
          labelData="Customer Name"
          onChange={OnInput}
          name={"customer_name"}
        ></FormItems>

        <FormItems
          labelData="Mob No."
          onChange={OnInput}
          type="number"
          name={"phone_number"}
        ></FormItems>

        <FormItems
          labelData="Email Address"
          onChange={OnInput}
          type="email"
          name={"email"}
          required
        ></FormItems>

        <FormItems
          labelData="CheckIn Date"
          onChange={OnInput}
          type="datetime-local"
          name={"checkin_date"}
        ></FormItems>

        <FormItems
          labelData="Checkout Date"
          onChange={OnInput}
          className={"booking-date"}
          type="datetime-local"
          name={"checkout_date"}
        ></FormItems>

        <FormItems
          labelData="Adults"
          onChange={OnInput}
          type="number"
          name={"adults"}
        ></FormItems>

        <FormItems
          labelData="Children"
          onChange={OnInput}
          type="number"
          name={"children"}
        ></FormItems>

        <FormItems
          labelData="Payment Mode"
          onChange={OnInput}
          element="select"
          option={PaymentMode}
          name={"payment_mode"}
        ></FormItems>

        <FormItems
          labelData="Total Amount"
          onChange={OnInput}
          type="number"
          name={"total_amount"}
        ></FormItems>

        <FormItems
          labelData="GST No."
          onChange={OnInput}
          type="number"
          name={"gst_number"}
        ></FormItems>

        <FormItems
          labelData="Booking Source"
          onChange={OnInput}
          name={"booking_source"}
          element="select"
          option={[
            "select source",
            "Goibibo",
            "MakeMyTrip",
            "agoda",
            "travelguru",
            "booking.com",
            "easemytrip",
            "ClearTrip",
            "Aiosell",
            "PMS single booking",
            "PMS group booking",
            "DaanERP",
          ]}
        ></FormItems>

        <FormItems
          labelData="Rate Plan Code"
          element="select"
          option={["Select Rate Plan", "EP", "CP", "MP"]}
          onChange={OnInput}
          name={"rateplanCode"}
        ></FormItems>

        <FormItems
          labelData="Booking Plan"
          element="select"
          option={["Select Booking Plan", "room_only", "CP"]}
          onChange={OnInput}
          name={"booking_plan"}
        ></FormItems>

        <FormItems
          labelData="PAH"
          element="select"
          option={["Select Pah", "Completed", "Pending"]}
          onChange={(e) =>
            setData({
              ...data,
              pah:
                e.target.value === "Completed"
                  ? true
                  : e.target.value === "Pending"
                    ? false
                    : "",
            })
          }
          name={"pah"}
        ></FormItems>

        <FormItems
          labelData="Status"
          element="select"
          option={["Select Status", "True", "False"]}
          onChange={(e) =>
            setData({
              ...data,
              status: e.target.value === "True" ? true : false,
            })
          }
          name={"status"}
        ></FormItems>

        <FormItems
          labelData="Room Category"
          element="select"
          option={[
            "Select Category",
            "EXECUTIVE",
            "STANDARD",
            "DELUXE",
            "SUITE",
          ]}
          onChange={OnInput}
          name={"room_category"}
        ></FormItems>

        <Button type={"submit"} child={"Add Details"}></Button>
      </form>
    </div>
  );
};

export default BookingAdd;
