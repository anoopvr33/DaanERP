import { Fragment, useState } from "react";
import FormItems from "../Elements/formItems";
import Button from "../Elements/button";
import "./style.css";

const AddBookindCheck = ({ setOpen }) => {
  const [data, setData] = useState("");

  const OnChange = (e) => {
    const { name, value } = e.target;
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

    setData(final);
  };

  return (
    <div className="booking-check">
      <i
        onClick={() => setOpen(null)}
        style={{ margin: "auto", marginRight: "0px" }}
        class="fa-regular fa-circle-xmark"
      ></i>
      <h2>Add CheckIn</h2>
      <p>Customer : GEORGE THOMAS</p>
      <p>Booking ID : MANashb87623</p> <br />
      <>
        <FormItems labelData={"checkIn"} type="datetime-local"></FormItems>{" "}
        <span> </span>
        <Button child="Submit"></Button>
      </>
    </div>
  );
};

export default AddBookindCheck;
