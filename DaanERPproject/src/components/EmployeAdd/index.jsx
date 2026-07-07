import { useEffect, useState } from "react";
import FormItems from "../Elements/formItems";
import Button from "../Elements/button";
import "./style.css";
import { API, getCookie } from "../../utils/axios";
import { Hotels } from "../../utils";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import Filter from "../Elements/Filter";

const EmployeeAdd = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    is_superuser: null,
    is_staff: null,
    hotels: [],
  });

  //   Monsoon Retreats by DAAN
  // The Cloud by Daan
  // Daan Ambalath Maple

  const navigate = useNavigate();
  const [options, setHotelOptions] = useState([]);

  const OnInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const OnSubmit = async (e) => {
    e.preventDefault();


    const res = await API.post("/main/create_user/", data, {
      withCredentials: true,
      headers: {
        "X-CSRFToken": getCookie("csrftoken"),
      },
    });
  
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

  

  useEffect(() => {
    const hotels = Hotels();
    if (hotels?.length === 0 || !hotels) {
      navigate("/login");
    }

    if (hotels && hotels.length > 0) {
      const formatted = hotels.map((i) => ({
        value: i,
        label: i.charAt(0).toUpperCase() + i.slice(1),
      }));

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHotelOptions(formatted);
      setData((prev) => ({ ...prev, hotels: formatted.map((i) => i.value) })); // initialize selection
    }
  }, []);

  return (
    <div className="add-book-main">
      <form action="" onSubmit={OnSubmit}>
        <FormItems
          labelData="Username"
          required={true}
          placeholder={"daanhotel_123"}
          onChange={OnInput}
          name={"username"}
        ></FormItems>

        <FormItems
          required={true}
          labelData={"Email"}
          placeholder={"daan@gmail.com"}
          onChange={OnInput}
          name={"email"}
        ></FormItems>

        <FormItems
          required={true}
          placeholder={"* * * * * *"}
          labelData={"Password"}
          onChange={OnInput}
          type="password"
          name={"password"}
        ></FormItems>

        <Filter
          labelData={"Hotels"}
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
          disableFrom={true}
          placeholder={"All Hotels"}
          options={options}
          isMulti
          className="custom-multi-select"
        ></Filter>

        <FormItems
          required={true}
          labelData={"Is Admin"}
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

        <FormItems
          required={true}
          labelData={"Is Staff"}
          onChange={(e) =>
            setData({
              ...data,
              is_staff: e.target.value === "true" ? true : false,
            })
          }
          type="text"
          element="select"
          option={[
            { name: "select option", value: "" },
            { name: "yes", value: true },
            { name: "no", value: false },
          ]}
          name={"is_staff"}
        ></FormItems>

        <Button type={"submit"} child={"Add Details"}></Button>
      </form>
    </div>
  );
};

export default EmployeeAdd;
