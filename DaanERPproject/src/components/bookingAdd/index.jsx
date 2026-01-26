import React, { useEffect, useState } from "react";
import FormItems from "../formItems";
import Button from "../button";
import "./style.css";
import { useDispatch } from "react-redux";
import { addBookingThunk } from "../../redux/bookingSlice";
import axios from "axios";
import { API } from "../../utils/axios";

const BookingAdd = () => {
  const [data, setData] = useState({
    hotel: "",
    customer_name: "",
    phone_number: "",
    email: "",
    checkin_date: "",
    checkout_date: "",
    adults: 0,
    children: 0,
    total_amount: 0,
    booking_source: "",
    booking_plan: "",
  });
  const dispatch = useDispatch();

  const OnInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const OnSubmit = async (e) => {
    e.preventDefault();
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
          <p>Hotel</p>
          <FormItems
            // placeholder={"Hotel"}
            onChange={OnInput}
            name={"hotel"}
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
            type="date"
            name={"checkin_date"}
          ></FormItems>
        </label>
        <label htmlFor="">
          <p>checkout date</p>
          <FormItems
            onChange={OnInput}
            className={"booking-date"}
            type="date"
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
          <p>Total Amount</p>
          <FormItems
            onChange={OnInput}
            type="number"
            name={"total_amount"}
          ></FormItems>
        </label>
        <label htmlFor="">
          <p>Booking Source</p>
          <FormItems onChange={OnInput} name={"booking_source"}></FormItems>
        </label>
        <label htmlFor="">
          <p>Booking Plan</p>
          <FormItems onChange={OnInput} name={"booking_plan"}></FormItems>
        </label>
        <Button type={"submit"} child={"Add Details"}></Button>
      </form>
    </div>
  );
};

export default BookingAdd;
