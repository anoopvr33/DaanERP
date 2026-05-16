import React, { useEffect, useState } from "react";
import FormItems from "../Elements/formItems";
import Button from "../Elements/button";
import "./style.css";
import { useDispatch } from "react-redux";
import { addBookingThunk } from "../../redux/bookingSlice";
import axios from "axios";
import { API, getCookie } from "../../utils/axios";
import { Hotels } from "../../utils";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
// import Select from "../Elements/select";

const EmployeeAdd = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    is_superuser: false,
    hotels: [],
  });

  //   Monsoon Retreats by DAAN
  // The Cloud by Daan
  // Daan Ambalath Maple

  const navigate = useNavigate();
  const [options, setHotelOptions] = useState([]);
  const [hotelData, setHotelData] = useState([]);
  const dispatch = useDispatch();

  const OnInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const OnSubmit = async (e) => {
    e.preventDefault();

    console.log("add user", data);

    const res = await API.post("/main/create_user/", data, {
      withCredentials: true,
      headers: {
        "X-CSRFToken": getCookie("csrftoken"),
      },
    });
    console.log("user add", res);
    if (res.data.status === "success") {
      alert("successfully added");
    } else alert("something went wrong");

    // dispatch(addBookingThunk(data));

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

  //   username
  // email
  // is_superuser
  // is_active
  // hotel_name

  useEffect(() => {
    console.log("my data", data);
  }, [data]);

  useEffect(() => {
    const hotels = Hotels();
    if (hotels?.length === 0 || !hotels) {
      navigate("/login");
    }
    console.log("hotelsss", hotels);

    if (hotels && hotels.length > 0) {
      const formatted = hotels.map((i) => ({
        value: i,
        label: i.charAt(0).toUpperCase() + i.slice(1),
      }));

      setHotelOptions(formatted);
      setData((prev) => ({ ...prev, hotels: formatted.map((i) => i.value) })); // initialize selection
    }
  }, []);

  return (
    <div className="add-book-main">
      <form action="" onSubmit={OnSubmit}>
        <label htmlFor="">
          <p>Username</p>
          <FormItems
            // placeholder={"Hotel"}
            onChange={OnInput}
            name={"username"}
          ></FormItems>
        </label>
        <label htmlFor="">
          <p>Email</p>
          <FormItems onChange={OnInput} name={"email"}></FormItems>
        </label>
        <label htmlFor="">
          <p>Password</p>
          <FormItems
            onChange={OnInput}
            type="password"
            name={"password"}
          ></FormItems>
        </label>
        <label htmlFor="">
          <p>Select Hotels</p>

          <Select
            onChange={(selected) => {
              // if (!selected) return setHotel([]);
              if (!selected || selected.length === 0) {
                setData((prev) => ({
                  ...prev,
                  hotels: options.map((i) => i.value),
                }));
                return;
              }
              setData((prev) => ({
                ...prev,
                hotels: selected.map((i) => i.value),
              }));
            }}
            options={options}
            isMulti
            className="custom-multi-select"
          ></Select>
        </label>
        <label htmlFor="">
          <p>is_superuser</p>
          <FormItems
            onChange={(e) =>
              setData({
                ...data,
                is_superuser: e.target.value === "true" ? true : false,
              })
            }
            type="text"
            element="select"
            option={[
              { name: "select option", value: "" },
              { name: "yes", value: true },
              { name: "no", value: false },
            ]}
            name={"is_superuser"}
          ></FormItems>
        </label>

        <Button type={"submit"} child={"Add Details"}></Button>
      </form>
    </div>
  );
};

export default EmployeeAdd;
