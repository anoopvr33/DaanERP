import { Fragment, useEffect, useState } from "react";
import FormItems from "../Elements/formItems";
import Button from "../Elements/button";
import "./style.css";
import { API } from "../../utils/axios";
import { AddBooking_CheckIn, AddBooking_CheckOut } from "../../api";

const AddBookindCheck = ({
  setOpen,
  hotelId,
  customer,
  bookid,
  checkIn,
  check,
}) => {
  const [data, setData] = useState({
    checkin: {
      guestName: customer,
      roomType: "",
      roomTypeName: "",
      checkinDate: "",
      checkoutDate: "",
      nights: 1,
      ratePlan: "",
      guestCount: 1,
      segment: "",
      channel: "",
      folioNum: "",
      bookingId: bookid,
    },

    hotelId: hotelId,
    roomNum: "",
    roomNumId: "",
    operation: "",
    hotelCountryCode: "",
  });

  const OnSubmit = async () => {
    console.log("checkin data", data);
    try {
      if (check === false) {
        const response = await AddBooking_CheckIn(data);
        console.log("checkin respose", response);

        if (response.data.success === true) {
          return alert("successfully updated");
        } else throw response.data.message || "Error";
      } else if (check === true) {
        const response = await AddBooking_CheckOut(data);
        console.log("checkout respose", response);

        if (response.data.success === true) {
          return alert("successfully updated");
        } else throw response.data.message || "Error";
      }
    } catch (error) {
      alert(error);
    }
  };

  const OnChange = (e) => {
    const { name, value } = e.target;

    if (name === "checkinDate" || name === "checkoutDate") {
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

      // setData({ ...data, [name]: final });/

      setData({
        ...data,
        checkin: {
          ...data.checkin,
          [name]: final,
        },
      });

      return;
    }

    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    console.log("checkin console data", data);
  }, [data]);

  return (
    <div className="booking-check">
      <i
        onClick={() => setOpen({ index: null, check: null })}
        style={{ margin: "auto", marginRight: "0px" }}
        class="fa-regular fa-circle-xmark"
      ></i>
      {check === false ? <h2> Check-In</h2> : <h2>Check-out</h2>}
      <p>Customer : {customer}</p>
      <p>Booking ID : {bookid}</p> <br />
      <div>
        <FormItems
          value={data.hotelId}
          onChange={OnChange}
          labelData={"hotelId"}
          name={"hotelId"}
        ></FormItems>
        <FormItems
          onChange={OnChange}
          labelData={"roomNum"}
          name="roomNum"
        ></FormItems>
        <FormItems
          onChange={OnChange}
          labelData={"roomNumId"}
          name="roomNumId"
        ></FormItems>
        <FormItems
          onChange={OnChange}
          labelData={"operation"}
          name="operation"
        ></FormItems>
        <FormItems
          onChange={(e) =>
            setData({
              ...data,
              checkin: {
                ...data.checkin,
                guestName: e.target.value,
              },
            })
          }
          labelData={"guestName"}
          value={data.checkin.guestName}
          name="guestName"
        ></FormItems>
        <FormItems
          onChange={(e) =>
            setData({
              ...data,
              checkin: {
                ...data.checkin,
                roomType: e.target.value,
              },
            })
          }
          labelData={"roomType"}
          name="roomType"
        ></FormItems>
        <FormItems
          onChange={(e) =>
            setData({
              ...data,
              checkin: {
                ...data.checkin,
                roomTypeName: e.target.value,
              },
            })
          }
          labelData={"roomTypeName"}
          name="roomTypeName"
        ></FormItems>
        <FormItems
          onChange={OnChange}
          labelData={"checkinDate"}
          // value={data.checkinDate}
          type="datetime-local"
          name="checkinDate"
        ></FormItems>
        <FormItems
          onChange={OnChange}
          labelData={"checkoutDate"}
          type="datetime-local"
          name="checkoutDate"
        ></FormItems>
        <FormItems
          onChange={(e) =>
            setData({
              ...data,
              checkin: {
                ...data.checkin,
                nights: e.target.value,
              },
            })
          }
          labelData={"nights"}
          type="number"
          name="nights"
        ></FormItems>
        <FormItems
          onChange={(e) =>
            setData({
              ...data,
              checkin: {
                ...data.checkin,
                ratePlan: e.target.value,
              },
            })
          }
          labelData={"ratePlan"}
          name="ratePlan"
        ></FormItems>

        <FormItems
          onChange={(e) =>
            setData({
              ...data,
              checkin: {
                ...data.checkin,
                guestCount: e.target.value,
              },
            })
          }
          labelData={"guestCount"}
          name="guestCount"
        ></FormItems>
        <FormItems
          onChange={(e) =>
            setData({
              ...data,
              checkin: {
                ...data.checkin,
                segment: e.target.value,
              },
            })
          }
          labelData={"segment"}
          name="segment"
        ></FormItems>
        <FormItems
          onChange={(e) =>
            setData({
              ...data,
              checkin: {
                ...data.checkin,
                channel: e.target.value,
              },
            })
          }
          labelData={"channel"}
          name="channel"
        ></FormItems>
        <FormItems
          onChange={(e) =>
            setData({
              ...data,
              checkin: {
                ...data.checkin,
                folioNum: e.target.value,
              },
            })
          }
          labelData={"folioNum"}
          name="folioNum"
        ></FormItems>
        <FormItems
          onChange={(e) =>
            setData({
              ...data,
              checkin: {
                ...data.checkin,
                bookingId: e.target.value,
              },
            })
          }
          labelData={"bookingId"}
          value={data.checkin.bookingId}
          name="bookingId"
        ></FormItems>
        <FormItems
          onChange={OnChange}
          labelData={"hotelCountryCode"}
          name="hotelCountryCode"
        ></FormItems>
      </div>
      <Button onClick={OnSubmit} child={"Submit"}></Button>
    </div>
  );
};

export default AddBookindCheck;
