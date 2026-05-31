import { Fragment, useEffect, useState } from "react";
import FormItems from "../Elements/formItems";
import Button from "../Elements/button";
import "./style.css";
import { API } from "../../utils/axios";
import { AddBooking_CheckIn, AddBooking_CheckOut } from "../../api";

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

const AddBookindCheckOut = ({
  setOpen,
  hotelId,
  customer,
  bookid,
  guest,
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
      guestCount: guest,
      paymentMode: "",
      segment: "",
      channel: "",
      folioNum: "",
      bookingId: bookid,
    },

    hotelId: hotelId,
    roomNum: "",
    roomNumId: "",
    operation: "checkout",
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

      const pad = (num) => String(num).padStart(2, "0");

      const final = `${dateObj.getFullYear()}-${pad(dateObj.getMonth() + 1)}-${pad(dateObj.getDate())} ${pad(dateObj.getHours())}:${pad(dateObj.getMinutes())}:${pad(dateObj.getSeconds())}`;

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
          // element="select"
          defualt={"checkout"}
          // option={["checkout", "checkin"]}
          type="text"
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
          element="select"
          option={["Select Rm. type", "DEL", "STD", "Deluxe Room"]}
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
        {/* <FormItems
          onChange={OnChange}
          labelData={"checkinDate"}
     
          type="datetime-local"
          name="checkinDate"
        ></FormItems> */}
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
          element="select"
          option={["Select Rm. plan", "EP", "CP", "MAP"]}
          labelData={"ratePlan"}
          name="ratePlan"
        ></FormItems>

        <FormItems
          labelData="Payment Mode"
          onChange={(e) =>
            setData({
              ...data,
              checkout: {
                ...data.checkout,
                paymentMode: e.target.value,
              },
            })
          }
          element="select"
          option={PaymentModeOptions}
          name={"paymentMode"}
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
          max={20}
          min={1}
          defualt={guest}
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
          element="select"
          option={["Select segment", "Walk-in", "Corporate", "OTA"]}
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
          element="select"
          option={["Select Channel", "PMS", "Direct", "Booking.com"]}
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
          element="select"
          option={["Select Code", "IN", "91"]}
        ></FormItems>
      </div>
      <Button onClick={OnSubmit} child={"Submit"}></Button>
    </div>
  );
};

export default AddBookindCheckOut;
