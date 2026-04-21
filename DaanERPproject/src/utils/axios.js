import axios from "axios";

export const API = axios.create({
  baseURL: "https://admin.daanregency.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Unauthorized
      console.log("Unauthorized - redirecting");

      localStorage.removeItem("hotel");
      localStorage.removeItem("isSuper");

      // redirect to login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
// headers: {
//   "X-CSRFToken": getCookie("csrftoken")
// }
