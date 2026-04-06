import axios from "axios";

export const API = axios.create({
  baseURL: "https://admin.daanregency.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
// headers: {
//   "X-CSRFToken": getCookie("csrftoken")
// }
