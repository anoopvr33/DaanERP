import React, { useEffect, useState } from "react";
import FormItems from "../Elements/formItems";
import Button from "../Elements/button";
import "./style.css";
import { useDispatch } from "react-redux";
import { addBookingThunk } from "../../redux/bookingSlice";
import axios from "axios";
import { API } from "../../utils/axios";
import { Hotels } from "../../utils";

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
    meal_plan: "",
    booking_plan: "",
    status: "",
    booking_id: "",
    invoice_pdf: null,
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
        <label htmlFor="">
          <p>Booking Date</p>
          <FormItems
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
        </label>
        <label htmlFor="">
          <p>Booking ID</p>
          <FormItems onChange={OnInput} name={"booking_id"}></FormItems>
        </label>
        <label htmlFor="">
          <p>Hotel</p>
          <FormItems
            // placeholder={"Hotel"}
            onChange={OnInput}
            name={"hotel_code"}
            element="select"
            option={["select Hotel", ...Hotels()]}
          ></FormItems>
        </label>
        <label htmlFor="">
          <p>Customer Name</p>
          <FormItems onChange={OnInput} name={"customer_name"}></FormItems>
        </label>
        <label htmlFor="">
          <p>Phone Number</p>
          <FormItems
            onChange={OnInput}
            type="number"
            name={"phone_number"}
          ></FormItems>
        </label>
        <label htmlFor="">
          <p>Email</p>
          <FormItems
            onChange={OnInput}
            type="email"
            name={"email"}
            required
          ></FormItems>
        </label>
        <label htmlFor="">
          <p>checkin date</p>
          <FormItems
            onChange={OnInput}
            type="datetime-local"
            name={"checkin_date"}
          ></FormItems>
        </label>
        <label htmlFor="">
          <p>checkout date</p>
          <FormItems
            onChange={OnInput}
            className={"booking-date"}
            type="datetime-local"
            name={"checkout_date"}
          ></FormItems>
        </label>
        <label htmlFor="">
          <p>Adults</p>
          <FormItems
            onChange={OnInput}
            type="number"
            name={"adults"}
          ></FormItems>
        </label>
        <label htmlFor="">
          <p>Children</p>
          <FormItems
            onChange={OnInput}
            type="number"
            name={"children"}
          ></FormItems>
        </label>
        <label htmlFor="">
          <p>Payment Mode</p>
          <FormItems
            onChange={OnInput}
            type="text"
            name={"payment_mode"}
          ></FormItems>
        </label>
        <label htmlFor="">
          <p>Total Amount</p>
          <FormItems
            onChange={OnInput}
            type="number"
            name={"total_amount"}
          ></FormItems>
        </label>
        <label htmlFor="">
          <p>Gst No.</p>
          <FormItems
            onChange={OnInput}
            type="number"
            name={"gst_number"}
          ></FormItems>
        </label>
        <label htmlFor="">
          <p>invoice_pdf</p>
          <FormItems onChange={OnInput} name={"invoice_pdf"}></FormItems>
        </label>
        <label htmlFor="">
          <p>Booking Source</p>
          <FormItems onChange={OnInput} name={"booking_source"}></FormItems>
        </label>
        <label htmlFor="">
          <p>Meal Plan</p>
          <FormItems
            element="select"
            option={["Select Plan", "EP", "CP"]}
            onChange={OnInput}
            name={"meal_plan"}
          ></FormItems>
        </label>
        <label htmlFor="">
          <p>Booking Plan</p>
          <FormItems
            element="select"
            option={["Select Plan", "room_only", "CP"]}
            onChange={OnInput}
            name={"booking_plan"}
          ></FormItems>
        </label>
        <label htmlFor="">
          <p>Pah</p>
          <FormItems
            element="select"
            option={["Select", "Completed", "Pending"]}
            onChange={(e) =>
              setData({
                ...data,
                pah: e.target.value === "Completed" ? true : false,
              })
            }
            name={"pah"}
          ></FormItems>
        </label>
        <label htmlFor="">
          <p>Status</p>
          <FormItems
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
        </label>
        <label htmlFor="">
          <p>Room Category</p>
          <FormItems
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
        </label>
        <Button type={"submit"} child={"Add Details"}></Button>
      </form>
    </div>
  );
};

export default BookingAdd;
