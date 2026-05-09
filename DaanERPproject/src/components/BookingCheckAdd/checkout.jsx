import { Fragment, useEffect, useState } from "react";
import FormItems from "../Elements/formItems";
import Button from "../Elements/button";
import "./style.css";
import { API } from "../../utils/axios";
import { AddBooking_CheckIn, AddBooking_CheckOut } from "../../api";

const AddBookindCheckOut = ({
  setOpen,
  hotelId,
  customer,
  bookid,
  checkIn,
}) => {
  const [data, setData] = useState({
    checkout: {
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
    console.log("checkout data", data);
    try {
      const response = await AddBooking_CheckOut(data);
      console.log("checkout respose", response);

      if (response.data.success === true) {
        return alert("successfully updated");
      } else throw response.data.message || "Error";
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
        checkout: {
          ...data.checkout,
          [name]: final,
        },
      });

      return;
    }

    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    console.log("checkout console data", data);
  }, [data]);

  return (
    <div className="booking-check">
      <i
        onClick={() => setOpen({ index: null, check: null })}
        style={{ margin: "auto", marginRight: "0px" }}
        class="fa-regular fa-circle-xmark"
      ></i>
      {<h2>Check-out</h2>}
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
              checkout: {
                ...data.checkout,
                guestName: e.target.value,
              },
            })
          }
          labelData={"guestName"}
          value={data.checkout.guestName}
          name="guestName"
        ></FormItems>
        <FormItems
          onChange={(e) =>
            setData({
              ...data,
              checkout: {
                ...data.checkout,
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
              checkout: {
                ...data.checkout,
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
          defualt={1}
          onChange={(e) =>
            setData({
              ...data,
              checkout: {
                ...data.checkout,
                nights: Number(e.target.value),
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
              checkout: {
                ...data.checkout,
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
              checkout: {
                ...data.checkout,
                guestCount: Number(e.target.value),
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
              checkout: {
                ...data.checkout,
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
              checkout: {
                ...data.checkout,
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
              checkout: {
                ...data.checkout,
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
              checkout: {
                ...data.checkout,
                bookingId: e.target.value,
              },
            })
          }
          labelData={"bookingId"}
          value={data.checkout.bookingId}
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

export default AddBookindCheckOut;
