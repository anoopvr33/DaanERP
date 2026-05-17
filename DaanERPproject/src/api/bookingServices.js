import { API, getCookie } from "../utils/axios";

const credentials = {
  withCredentials: true,
  headers: {
    "X-CSRFToken": getCookie("csrftoken"),
  },
};

export const GetBookingDataAPI = async (data) => {
  console.log("filter date", data);
  return await API.post("/bookings/bookings_by_date/", data, credentials);
};

export const EditBookingDataAPI = async (data, id) => {
  console.log("edit booking", data, id);
  return await API.post(`/bookings/booking_update/${id}/`, data, credentials);
};

export const DeleteBookingDataAPI = async (id) => {
  console.log("delete booking", id);
  return await API.post(`/bookings/booking_delete/${id}/`, {}, credentials);
};

export const AddBookingAPI = async (data) => {
  console.log("my booking data to add", data);
  return await API.post("/bookings/booking_create/", data, credentials);
};

export const AddBooking_CheckIn = async (data) => {
  console.log("my booking checkin", data);
  return await API.post("/bookings/checkin/", data, credentials);
};

export const AddBooking_CheckOut = async (data) => {
  console.log("my booking checkout", data);
  return await API.post("/bookings/checkout/", data, credentials);
};
