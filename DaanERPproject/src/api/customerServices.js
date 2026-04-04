import { API, getCookie } from "../utils/axios";

export const GetCustomerDataAPI = async (data) => {
  console.log("daaaat", data);

  return await API.post("/bookings/get_monthly_customers/", data, {
    withCredentials: true,
    headers: {
      "X-CSRFToken": getCookie("csrftoken"),
    },
  });
};
