import { useEffect, useState } from "react";
import { API } from "../../utils/axios";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/axios";

const UserLogin = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({ username: "", password: "" });

  const EnterData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const OnLog = async () => {
    try {
      const response = await API.post("/main/admin_login/", data, {
        withCredentials: true,
        headers: {
          "X-CSRFToken": getCookie("csrftoken"),
        },
      });

      if (response.data.hotel) {
        localStorage.setItem("hotel", JSON.stringify(response.data.hotel));
        (localStorage.setItem(
          "isSuper",
          JSON.stringify(response.data.is_superuser ? true : false),
        ),
          navigate("/"));
      } else {
        throw new Error("something wrong");
      }
    } catch (error) {
      alert(error);
    }
  };

  // const OnLogin = async () => {
  //   const response = await API.get("/main/profile/", {
  //     withCredentials: true,
  //     headers: {
  //       "X-CSRFToken": getCookie("csrftoken"),
  //     },
  //   });

  //   console.log("mylog res", response);

  //   if (response.data.message) {
  //     localStorage.setItem("token", response.data.token);

  //   } else {
  //     return alert("Invalid Credentials");
  //   }
  // };

  useEffect(() => {
    // SetTokenFalse();
  }, []);

  return (
    <div className="user-login">
      <div className="user-login-1">
        <h1>Sign In</h1>
        <input
          onChange={EnterData}
          type="text"
          placeholder="Email or Username"
          name="username"
          id="1"
        />
        <input
          onChange={EnterData}
          type="password"
          placeholder="Password"
          name="password"
          id="2"
        />
        <button onClick={OnLog}>Sign In</button>
        <p>__________or__________</p>
        {/* <button onClick={'OnLogin'}>Sign In with Google</button> */}
      </div>
    </div>
  );
};

export default UserLogin;
