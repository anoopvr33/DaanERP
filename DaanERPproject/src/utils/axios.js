import axios from "axios";

export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "X-CSRFToken": getCookie("csrftoken"),
    "Content-Type": "application/json",
  },
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Unauthorized
      // console.log("Unauthorized - redirecting");

      localStorage.removeItem("hotel");
      localStorage.removeItem("isSuper");
      localStorage.removeItem("isStaff");

      // redirect to login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

// headers: {+78+
//   "X-CSRFToken": getCookie("csrftoken")
// }
