import "./style.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginAPI } from "../../api/authServices";

const UserLogin = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({ username: null, password: null });

  const EnterData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const OnLog = async () => {
    if (!data.password || !data.username) {
      return alert("Please enter username and password");
    }

    if (data.password)
      try {
        const response = await LoginAPI(data);

        if (response?.data?.hotel) {
          localStorage.setItem("hotel", JSON.stringify(response?.data?.hotel));
          localStorage.setItem(
            "isSuper",
            JSON.stringify(response?.data?.is_superuser ? true : false),
          );
          localStorage.setItem(
            "isStaff",
            JSON.stringify(response?.data?.is_staff ? true : false),
          );
          if (response?.data?.is_staff === true) {
            return navigate("/Booking/?index=2");
          }
          navigate("/");
        } else {
          throw new Error("something wrong");
        }
      } catch (error) {
        alert(error);
      }
  };



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
        <p>Forgot password?</p>
        {/* <p>__________or__________</p> */}
        {/* <button onClick={'OnLogin'}>Sign In with Google</button> */}
      </div>
    </div>
  );
};

export default UserLogin;
