// get Dashboard details

import { API, getCookie } from "../utils/axios";

// API.post(
//       "/dashboard/get_report/",
//       {
//         hotels: [Daan ambalath],
//         from_date: prevMonthDate,
//         to_date: yesterdayDate,
//       },

export const GetDashboardAPI = async (data) => {
  return await API.post(
    "/dashboard/get_report/",
    {
      hotels: data.SelectedHotel,
      from_date: data.prevMonthDate,
      to_date: data.yesterdayDate,
    },
    {
      withCredentials: true,
      headers: {
        "X-CSRFToken": getCookie("csrftoken"),
      },
    },
  );
};
