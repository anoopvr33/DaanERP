import React, { useEffect, useState } from "react";
import FormItems from "../Elements/formItems";
import Button from "../Elements/button";
import "./style.css";
import { useDispatch } from "react-redux";
import { addBookingThunk } from "../../redux/bookingSlice";
import axios from "axios";
import { API, getCookie } from "../../utils/axios";
import { Hotels } from "../../utils";

const EmployeeAdd = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    is_superuser: false,
    hotels: [],
  });

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
          <FormItems
            onChange={(e) => {
              const selected = Array.from(
                e.target.selectedOptions,
                (opt) => opt.value,
              );
              setData((prev) => ({ ...prev, hotels: selected }));
              // setForm((prev) => ({ ...prev, hotels: [e.target.value] }));
            }}
            // onChange={(e) => setData({ ...data, hotels: [e.target.value] })}

            multiple
            element="select"
            option={Hotels}
            name={"hotel_name"}
            required
          ></FormItems>
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
